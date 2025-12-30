'use client';

import { useConnect } from '@stacks/connect-react';
import { STACKS_MAINNET } from '@stacks/network';
import { AnchorMode, PostConditionMode, uintCV, contractPrincipalCV } from '@stacks/transactions';
import { userSession } from '../src/utils/stacks-config.js';

const CONTRACT_ADDRESS = 'SP1TN1ERKXEM2H9TKKWGPGZVNVNEKS92M7M3CKVJJ';
const NFT_CONTRACT = 'orange-nft-v19';
const MARKETPLACE_CONTRACT = 'orange-marketplace-v19';

const NFT_ITEMS = [
    { id: '1', name: 'Bionic Orange #001', price: '50', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800' },
    { id: '2', name: 'Cyber Zest #042', price: '75', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800' },
    { id: '3', name: 'Neon Peel #108', price: '120', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800' }
];

export function Marketplace() {
    const { doContractCall } = useConnect();

    const handleBuy = async (tokenId: string) => {
        if (!userSession.isUserSignedIn()) {
            alert("Connect wallet first!");
            return;
        }

        await doContractCall({
            network: STACKS_MAINNET,
            anchorMode: AnchorMode.Any,
            contractAddress: CONTRACT_ADDRESS,
            contractName: MARKETPLACE_CONTRACT,
            functionName: 'buy-asset',
            functionArgs: [
                contractPrincipalCV(CONTRACT_ADDRESS, NFT_CONTRACT),
                uintCV(tokenId)
            ],
            postConditionMode: PostConditionMode.Allow,
            onFinish: (data) => {
                console.log('Purchase broadcasted:', data.txId);
                alert('Purchase transaction broadcasted!');
            },
        });
    };

    return (
        <section className="container section-padding">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-4xl font-black mb-2 uppercase tracking-tighter">Marketplace</h2>
                    <p className="opacity-60">Acquire rare digital artifacts from the Orange ecosystem.</p>
                </div>
                <div className="flex gap-4">
                    <button className="btn-secondary rounded-full px-6">Filter</button>
                    <button className="btn-secondary rounded-full px-6">Sort</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {NFT_ITEMS.map((nft) => (
                    <div key={nft.id} className="nft-card glass rounded-3xl overflow-hidden group">
                        <div className="relative aspect-square overflow-hidden">
                            <img
                                src={nft.image}
                                alt={nft.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                                #{nft.id}
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-4">{nft.name}</h3>
                            <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                                <div>
                                    <div className="text-[10px] opacity-40 uppercase font-black tracking-widest mb-1">Price</div>
                                    <div className="font-mono font-bold text-orange-primary">{nft.price} STX</div>
                                </div>
                                <button
                                    onClick={() => handleBuy(nft.id)}
                                    className="btn-primary h-10 px-6 text-sm"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
