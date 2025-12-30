import { userSession } from '../utils/stacks-config.js';
import { buyAsset } from '../utils/contract-utils.js';

export const initMarketplacePage = () => {
    const buyButtons = document.querySelectorAll('.buy-now-btn');

    buyButtons.forEach(btn => {
        btn.onclick = async () => {
            if (!userSession.isUserSignedIn()) {
                alert('Please connect your wallet first');
                return;
            }

            const tokenId = btn.getAttribute('data-token-id');
            if (tokenId) {
                if (confirm(`Buy NFT #${tokenId}?`)) {
                    await buyAsset(tokenId);
                }
            }
        };
    });
};
