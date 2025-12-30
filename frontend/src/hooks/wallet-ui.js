import { userSession, authenticate, disconnect, getAddress } from '../utils/stacks-config.js';

export const initWalletUI = () => {
    const connectBtn = document.getElementById('connect-wallet');

    if (!connectBtn) return;

    const updateUI = () => {
        if (userSession.isUserSignedIn()) {
            const address = getAddress();
            connectBtn.innerHTML = `<span>${address.slice(0, 4)}...${address.slice(-4)}</span>`;
            connectBtn.classList.add('connected');

            // Add disconnect listener
            connectBtn.onclick = () => {
                if (confirm('Disconnect wallet?')) {
                    disconnect();
                }
            };
        } else {
            connectBtn.innerHTML = '<span>Connect Wallet</span>';
            connectBtn.classList.remove('connected');
            connectBtn.onclick = authenticate;
        }
    };

    updateUI();
};
