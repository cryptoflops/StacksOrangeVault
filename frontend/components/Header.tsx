'use client';

import React from 'react';
import Link from 'next/link';
import { useConnect } from '@stacks/connect-react';
import { userSession } from '../src/utils/stacks-config.js';

export const Header = () => {
    const { authenticate } = useConnect();

    const handleAuth = () => {
        authenticate({
            appDetails: {
                name: 'Stacks Orange Vault',
                icon: typeof window !== 'undefined' ? window.location.origin + '/favicon.ico' : '',
            },
            redirectTo: '/',
            onFinish: () => {
                window.location.reload();
            },
            userSession,
        });
    };

    const getTruncatedAddress = () => {
        if (!userSession.isUserSignedIn()) return '';
        const address = userSession.loadUserData().profile.stxAddress.mainnet || userSession.loadUserData().profile.stxAddress.testnet;
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    };

    return (
        <header className="sticky top-0 z-50 glass" style={{ height: '80px', marginBottom: 'var(--space-32)' }}>
            <div className="container h-full flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div style={{ width: '40px', height: '40px', background: 'var(--color-primary-orange)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--color-dark-bg)', fontSize: '24px' }}>O</div>
                    <span style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '-0.5px' }}>OrangeVault</span>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="nav-item hover:text-orange-primary transition-colors">Home</Link>
                    <Link href="/launchpad" className="nav-item hover:text-orange-primary transition-colors">Launchpad</Link>
                    <Link href="/quests" className="nav-item hover:text-orange-primary transition-colors">Quests</Link>
                    <Link href="/staking" className="nav-item hover:text-orange-primary transition-colors">Staking</Link>
                    <Link href="/marketplace" className="nav-item hover:text-orange-primary transition-colors">Market</Link>
                </nav>

                <div className="flex items-center gap-4">
                    {userSession.isUserSignedIn() ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-mono opacity-70 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                                {getTruncatedAddress()}
                            </span>
                            <button
                                onClick={() => userSession.signUserOut('/')}
                                className="btn-secondary"
                                style={{ height: '44px', padding: '0 20px', fontSize: '14px' }}
                            >
                                Disconnect
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAuth}
                            className="btn-primary"
                            style={{ height: '44px', padding: '0 24px' }}
                        >
                            Connect Wallet
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};
