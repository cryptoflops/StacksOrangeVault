'use client';

import { useState, useEffect } from 'react';
import { useConnect } from '@stacks/connect-react';
import { STACKS_MAINNET } from '@stacks/network';
import { AnchorMode, PostConditionMode, uintCV, contractPrincipalCV } from '@stacks/transactions';
import { userSession } from '../src/utils/stacks-config.js';
import { fetchTokenBalance, fetchActiveStake, formatTokenAmount } from '../src/utils/contract-utils';

const CONTRACT_ADDRESS = 'SP1TN1ERKXEM2H9TKKWGPGZVNVNEKS92M7M3CKVJJ';
const TOKEN_CONTRACT = 'orange-token-v19';
const STAKING_CONTRACT = 'orange-staking-v19';

interface StakingInfo {
    amount: { value: string };
    'staked-at': { value: string };
}

export function Staking() {
    const { doContractCall } = useConnect();
    const [amount, setAmount] = useState('');
    const [balance, setBalance] = useState('0');
    const [activeStake, setActiveStake] = useState<StakingInfo | null>(null);

    const updateData = async () => {
        if (userSession.isUserSignedIn()) {
            const bal = await fetchTokenBalance();
            setBalance(bal.toString());
            const stake = await fetchActiveStake();
            setActiveStake(stake as StakingInfo);
        }
    };

    useEffect(() => {
        const init = async () => {
            await updateData();
        };
        init();
    }, []);

    const handleStake = async () => {
        const amountFloat = parseFloat(amount);
        if (isNaN(amountFloat) || amountFloat <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        const amountMicro = Math.floor(amountFloat * 1000000);

        await doContractCall({
            network: STACKS_MAINNET,
            anchorMode: AnchorMode.Any,
            contractAddress: CONTRACT_ADDRESS,
            contractName: STAKING_CONTRACT,
            functionName: 'stake-tokens',
            functionArgs: [
                uintCV(amountMicro),
                contractPrincipalCV(CONTRACT_ADDRESS, TOKEN_CONTRACT)
            ],
            postConditionMode: PostConditionMode.Allow,
            onFinish: (data) => {
                console.log('Staking broadcasted:', data.txId);
                alert('Staking transaction broadcasted!');
                updateData();
            },
        });
    };

    const handleUnstake = async () => {
        await doContractCall({
            network: STACKS_MAINNET,
            anchorMode: AnchorMode.Any,
            contractAddress: CONTRACT_ADDRESS,
            contractName: STAKING_CONTRACT,
            functionName: 'unstake-tokens',
            functionArgs: [
                contractPrincipalCV(CONTRACT_ADDRESS, TOKEN_CONTRACT)
            ],
            postConditionMode: PostConditionMode.Allow,
            onFinish: (data) => {
                console.log('Unstaking broadcasted:', data.txId);
                alert('Unstaking transaction broadcasted!');
                updateData();
            },
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 container section-padding">
            <div className="staking-card glass p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-2">Staking Vault</h2>
                <p className="text-sm opacity-60 mb-8">Earn yield by locking ORANGE tokens.</p>

                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm opacity-70">Amount to Stake</label>
                        <span className="text-xs font-mono opacity-50">Balance: {formatTokenAmount(balance)} ORANGE</span>
                    </div>
                    <div className="relative">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pr-20 focus:outline-none focus:border-orange-primary transition-colors font-mono"
                        />
                        <button
                            onClick={() => setAmount((Number(balance) / 1000000).toString())}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-primary font-bold text-xs"
                        >
                            MAX
                        </button>
                    </div>
                </div>

                <div className="mb-8">
                    <label className="text-sm opacity-70 block mb-4">Lock Duration</label>
                    <div className="grid grid-cols-4 gap-2">
                        {['30d', '90d', '180d', '365d'].map((d) => (
                            <button key={d} className={`py-3 rounded-lg border text-sm font-medium transition-all ${d === '90d' ? 'border-orange-primary bg-orange-primary/10 text-orange-primary' : 'border-white/10 hover:border-white/20'}`}>
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleStake}
                    className="btn-primary w-full h-14"
                >
                    Stake Tokens
                </button>
            </div>

            <div className="staking-card glass p-8 rounded-2xl flex flex-col justify-between">
                <div>
                    <div className="mb-8 p-6 bg-orange-primary/5 border border-orange-primary/10 rounded-2xl">
                        <div className="text-4xl font-extrabold text-orange-primary mb-1">24.5%</div>
                        <div className="text-xs opacity-50 font-bold uppercase tracking-wider">Estimated APY</div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-4 border-b border-white/5">
                            <span className="opacity-60">Your Active Stake</span>
                            <span className="font-bold text-orange-primary">{activeStake ? formatTokenAmount(activeStake.amount.value) : '0.00'} ORANGE</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-white/5">
                            <span className="opacity-60">Projected Monthly Reward</span>
                            <span className="font-bold">250 ORANGE</span>
                        </div>
                        <div className="flex justify-between items-center py-4">
                            <button
                                onClick={handleUnstake}
                                className="text-xs opacity-40 hover:opacity-100 hover:text-red-400 transition-all uppercase font-bold tracking-widest"
                            >
                                Unstake All Tokens
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <h4 className="text-sm font-bold mb-4 opacity-80">Tier Benefits</h4>
                    <div className="space-y-3">
                        {['Early Access to ITOs', '20% Fee Discount', 'Governance Rights'].map(b => (
                            <div key={b} className="flex items-center gap-3 text-sm opacity-70">
                                <span className="text-orange-primary">✓</span>
                                {b}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
