import { userSession } from '../utils/stacks-config.js';
import { buyLaunchpadToken } from '../utils/contract-utils.js';

export const initLaunchpadPage = () => {
    const buyBtn = document.getElementById('buy-token-btn');
    const amountInput = document.getElementById('purchase-amount');
    const costPreview = document.getElementById('cost-preview');

    if (amountInput && costPreview) {
        amountInput.oninput = () => {
            const amount = parseFloat(amountInput.value) || 0;
            costPreview.innerText = `Total Cost: ${amount.toLocaleString()} STX`;
        };
    }

    if (buyBtn) {
        buyBtn.onclick = async () => {
            if (!userSession.isUserSignedIn()) {
                alert('Please connect your wallet first');
                return;
            }

            const amount = parseInt(amountInput.value);
            if (isNaN(amount) || amount <= 0) {
                alert('Please enter a valid token amount');
                return;
            }

            if (confirm(`Purchase ${amount} ORANGE tokens for ${amount} STX?`)) {
                await buyLaunchpadToken(amount);
            }
        };
    }
};
