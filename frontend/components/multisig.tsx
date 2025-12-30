'use client';

import { useState } from 'react';
import { useConnect } from '@stacks/connect-react';
import { STACKS_MOCKNET } from '@stacks/network';
import { AnchorMode, PostConditionMode, uintCV } from '@stacks/transactions';
import { CONTRACTS } from '../lib/contracts';

export function Multisig() {
    const { doContractCall } = useConnect();
    const [txId, setTxId] = useState('');

    const handleConfirm = async () => {
        const txIdInt = parseInt(txId);
        if (isNaN(txIdInt)) {
            alert("Please enter a valid Transaction ID.");
            return;
        }

        await doContractCall({
            network: STACKS_MOCKNET,
            anchorMode: AnchorMode.Any,
            contractAddress: CONTRACTS.MULTISIG.split('.')[0],
            contractName: CONTRACTS.MULTISIG.split('.')[1],
            functionName: 'confirm-transaction',
            functionArgs: [uintCV(txIdInt)],
            postConditionMode: PostConditionMode.Allow,
            onFinish: () => alert('Transaction confirmed!'),
        });
    };

    return (
        <div className="p-4 border rounded shadow-sm bg-white dark:bg-gray-800">
            <h2 className="text-xl font-bold mb-4">Multisig Wallet</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Confirm Transaction ID</label>
                    <input
                        type="number"
                        value={txId}
                        onChange={(e) => setTxId(e.target.value)}
                        className="w-full p-2 border rounded text-black"
                        placeholder="Tx ID"
                    />
                </div>
                <button
                    onClick={handleConfirm}
                    className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition"
                >
                    Confirm Transaction
                </button>
            </div>
        </div>
    );
}
