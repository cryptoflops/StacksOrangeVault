'use client';

import { useState } from 'react';
import { useConnect } from '@stacks/connect-react';
import { STACKS_MAINNET } from '@stacks/network';
import { AnchorMode, PostConditionMode, uintCV, contractPrincipalCV } from '@stacks/transactions';

const CONTRACT_ADDRESS = 'SP1TN1ERKXEM2H9TKKWGPGZVNVNEKS92M7M3CKVJJ';
const TOKEN_CONTRACT = 'orange-token-v19';
const LAUNCHPAD_CONTRACT = 'orange-launchpad-v19';

export function Launchpad() {
    const { doContractCall } = useConnect();
    const [amount, setAmount] = useState('');

    const handleBuy = async () => {
        const amountInt = parseInt(amount);
        if (isNaN(amountInt) || amountInt <= 0) {
            alert("Please enter a valid positive amount.");
            return;
        }

        await doContractCall({
            network: STACKS_MAINNET,
            anchorMode: AnchorMode.Any,
            contractAddress: CONTRACT_ADDRESS,
            contractName: LAUNCHPAD_CONTRACT,
            functionName: 'buy-token',
            functionArgs: [
                uintCV(amountInt),
                contractPrincipalCV(CONTRACT_ADDRESS, TOKEN_CONTRACT)
            ],
            postConditionMode: PostConditionMode.Allow,
            onFinish: (data) => {
                console.log('Transaction finished:', data);
                alert('Launchpad purchase broadcasted!');
            },
        });
    };

    return (
        <section className="container section-padding">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-5xl font-black mb-6 uppercase tracking-tighter leading-[0.9]">Orange Seed <br /><span className="text-orange-primary">Tier I Launch</span></h2>
                    <p className="text-lg opacity-60 mb-8 max-w-lg">
                        Participate in the foundational distribution of ORANGE tokens. Your gateway to the premium Stacks DeFi ecosystem.
                    </p>

                    <div className="grid grid-cols-3 gap-8 mb-8">
                        <div>
                            <div className="text-[10px] opacity-40 uppercase font-black tracking-widest mb-1">Status</div>
                            <div className="font-bold text-green-400 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                LIVE
                            </div>
                        </div>
                        <div>
                            <div className="text-[10px] opacity-40 uppercase font-black tracking-widest mb-1">Price</div>
                            <div className="font-mono font-bold">1 STX / ORANGE</div>
                        </div>
                        <div>
                            <div className="text-[10px] opacity-40 uppercase font-black tracking-widest mb-1">Cap</div>
                            <div className="font-mono font-bold">500K STX</div>
                        </div>
                    </div>
                </div>

                <div className="participation-card glass p-10 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-primary/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>

                    <h3 className="text-2xl font-bold mb-8">Contribute STX</h3>

                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm opacity-60">Raising 500k STX</span>
                            <span className="text-sm font-bold">75%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <div className="h-full bg-gradient-to-r from-orange-primary to-orange-secondary w-[75%] rounded-full shadow-[0_0_20px_rgba(255,69,0,0.3)]"></div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="text-sm opacity-60 block mb-2">Buy Amount (ORANGE)</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-orange-primary transition-all font-mono text-xl"
                                placeholder="0.00"
                            />
                        </div>

                        <div className="p-4 rounded-xl bg-orange-primary/5 border border-orange-primary/10 flex justify-between items-center">
                            <span className="text-xs opacity-60">You pay:</span>
                            <span className="font-bold">{amount || '0'} STX</span>
                        </div>

                        <button
                            onClick={handleBuy}
                            className="btn-primary w-full h-16 text-lg rounded-2xl"
                        >
                            Confirm Contribution
                        </button>
                    </div>

                    <p className="text-[10px] text-center mt-6 opacity-30 uppercase tracking-widest">
                        Tokens distributed instantly to wallet upon confirmation.
                    </p>
                </div>
            </div>
        </section>
    );
}
