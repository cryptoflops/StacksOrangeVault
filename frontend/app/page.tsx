'use client';

import { useState, useEffect } from 'react';
import { useConnect } from '@stacks/connect-react';
import { userSession } from '../src/utils/stacks-config.js';
import { Header } from '../components/Header';
import { Launchpad } from '../components/launchpad';
import { Marketplace } from '../components/marketplace';
import { Staking } from '../components/staking';
import { fetchTokenBalance, fetchActiveStake, formatTokenAmount } from '../src/utils/contract-utils';

interface StakingInfo {
  amount: { value: string };
  'staked-at': { value: string };
}

export default function Home() {
  const { authenticate } = useConnect();
  const [mounted, setMounted] = useState(false);
  const [balance, setBalance] = useState('0');
  const [activeStake, setActiveStake] = useState<StakingInfo | null>(null);

  const updateUserData = async () => {
    if (userSession.isUserSignedIn()) {
      const bal = await fetchTokenBalance();
      setBalance(bal.toString());
      const stake = await fetchActiveStake();
      setActiveStake(stake as StakingInfo);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    if (userSession.isUserSignedIn()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      updateUserData();
    }
    return () => clearTimeout(timer);
  }, []);


  if (!mounted) return null;

  if (!userSession.isUserSignedIn()) {
    return (
      <div className="min-h-screen bg-bg-dark text-white flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-4xl w-full text-center space-y-12 page-transition">
            <div className="space-y-4">
              <h1 className="text-[120px] font-black leading-[0.85] uppercase tracking-tighter">
                The <span className="text-orange-primary">Future</span> <br />
                Of Bitcoin
              </h1>
              <p className="text-xl opacity-40 max-w-2xl mx-auto uppercase font-bold tracking-widest">
                Premium DeFi & NFT Protocol on Stacks
              </p>
            </div>

            <div className="flex justify-center gap-6">
              <button
                onClick={() => authenticate({})}
                className="btn-primary h-16 px-12 text-xl rounded-2xl shadow-[0_0_50px_rgba(255,69,0,0.4)]"
              >
                Enter the Vault
              </button>
              <button className="btn-secondary h-16 px-12 text-xl rounded-2xl">
                Documentation
              </button>
            </div>

            <div className="pt-24 grid grid-cols-4 gap-8 opacity-20">
              {['Liquidity', 'Security', 'Scalability', 'Innovation'].map(attr => (
                <div key={attr} className="text-sm font-black uppercase tracking-[0.2em]">{attr}</div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark text-white pb-32">
      <Header />

      <main className="container space-y-32">
        {/* Hero / Asset Summary */}
        <section className="pt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
          <div className="lg:col-span-2">
            <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">Command Center</h1>
            <p className="text-lg opacity-40 max-w-xl">Welcome back, Commander. Your Orange Vault assets are secure and synchronized with Stacks Mainnet.</p>
          </div>

          <div className="glass p-8 rounded-3xl space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xs opacity-40 uppercase font-black tracking-widest">Your Portfolio</span>
              <span className="text-[10px] py-1 px-2 rounded-md bg-orange-primary/10 text-orange-primary font-bold">LIFETIME</span>
            </div>

            <div className="space-y-1">
              <div className="text-4xl font-mono font-bold">{formatTokenAmount(balance)}</div>
              <div className="text-xs opacity-40 font-bold uppercase tracking-widest">ORANGE Balance</div>
            </div>

            <div className="pt-4 border-t border-white/5 flex justify-between">
              <div>
                <div className="text-lg font-mono font-bold text-orange-primary">{activeStake ? formatTokenAmount(activeStake.amount.value) : '0.00'}</div>
                <div className="text-[10px] opacity-40 font-bold uppercase tracking-widest">In Staking</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-mono font-bold text-green-400">12.4%</div>
                <div className="text-[10px] opacity-40 font-bold uppercase tracking-widest">Rewards APR</div>
              </div>
            </div>
          </div>
        </section>

        <Launchpad />
        <Staking />
        <Marketplace />
      </main>
    </div>
  );
}
