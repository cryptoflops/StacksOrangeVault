import { AppConfig, UserSession, showConnect } from '@stacks/connect';
// Environment-aware network configuration
import { STACKS_TESTNET, STACKS_MAINNET } from '@stacks/network';

const appConfig = new AppConfig(['store_write', 'publish_data']);

// Singleton UserSession instance
const baseUserSession = new UserSession({ appConfig });

/**
 * Proxy UserSession to catch SessionData corruption errors.
 */
export const userSession = new Proxy(baseUserSession, {
    get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (typeof value === 'function') {
            return (...args) => {
                try {
                    return value.apply(target, args);
                } catch (e) {
                    if (e instanceof Error && (e.message.includes('SessionData') || e.message.includes('JSON'))) {
                        console.error("Stacks Session Corruption detected. Clearing local storage...", e);
                        localStorage.clear();
                        window.location.reload();
                    }
                    throw e;
                }
            };
        }
        return value;
    }
});

const networkType = process.env.NEXT_PUBLIC_STACKS_NETWORK || 'mainnet';
export const network = networkType === 'testnet' ? STACKS_TESTNET : STACKS_MAINNET;

export const getAddress = () => {
    if (userSession.isUserSignedIn()) {
        const userData = userSession.loadUserData();
        return networkType === 'testnet'
            ? userData.profile.stxAddress.testnet
            : userData.profile.stxAddress.mainnet;
    }
    return null;
};

export const authenticate = () => {
    showConnect({
        appDetails: {
            name: process.env.NEXT_PUBLIC_APP_NAME || 'StacksOrangeVault',
            icon: typeof window !== 'undefined' ? window.location.origin + '/assets/logo.png' : '',
        },
        // Reown (WalletConnect) Project ID for mobile support
        projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID,
        redirectTo: '/',
        onFinish: () => {
            window.location.reload();
        },
        userSession,
    });
};

export const disconnect = () => {
    userSession.signUserOut();
    window.location.reload();
};
