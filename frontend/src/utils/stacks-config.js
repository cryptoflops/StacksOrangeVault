import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { StacksTestnet, STACKS_MAINNET } from '@stacks/network';

const appConfig = new AppConfig(['store_write', 'publish_data']);

// Singleton UserSession instance
const baseUserSession = new UserSession({ appConfig });

/**
 * Proxy UserSession to catch SessionData corruption errors.
 * This happens when switching between library versions or after failed writes.
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

export const network = STACKS_MAINNET; // Standardizing on Mainnet after success

export const getAddress = () => {
    if (userSession.isUserSignedIn()) {
        return userSession.loadUserData().profile.stxAddress.mainnet;
    }
    return null;
};

export const authenticate = () => {
    showConnect({
        appDetails: {
            name: 'StacksOrangeVault',
            icon: window.location.origin + '/assets/logo.png',
        },
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
