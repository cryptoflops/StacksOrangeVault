'use client';

import * as React from 'react';
import { Connect } from '@stacks/connect-react';
import { userSession } from '../src/utils/stacks-config.js';

export function Providers({ children }: { children: React.ReactNode }) {
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true);
    }, []);

    const authOptions = {
        appDetails: {
            name: 'Stacks Orange Vault',
            icon: typeof window !== 'undefined' ? window.location.origin + '/favicon.ico' : '',
        },
        redirectTo: '/',
        onFinish: () => {
            window.location.reload();
        },
        userSession,
    };

    if (!isClient) return null;

    return (
        <Connect authOptions={authOptions}>
            {children}
        </Connect>
    );
}
