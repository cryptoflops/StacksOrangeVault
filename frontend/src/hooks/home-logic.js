import { userSession } from '../utils/stacks-config.js';
import { fetchTokenBalance, fetchActiveStake, formatTokenAmount } from '../utils/contract-utils.js';

export const initHomePage = async () => {
    const heroCta = document.querySelector('.hero-buttons .btn-primary');
    const statsStats = document.querySelectorAll('.stat-item h2');

    if (!userSession.isUserSignedIn()) return;

    // Personalize Hero Section for signed in users
    if (heroCta) {
        heroCta.innerText = 'Go to Staking';
        heroCta.onclick = () => window.location.href = 'staking.html';
    }

    // Update Stats with User Personal Data
    const updateStats = async () => {
        const rawBalance = await fetchTokenBalance();
        const stake = await fetchActiveStake();

        // Update TVL card (index 3) to show User Balance instead for personalized view
        if (statsStats[3]) {
            statsStats[3].innerText = `${formatTokenAmount(rawBalance)}`;
            statsStats[3].parentElement.querySelector('p').innerText = 'Your Tokens';
        }

        // Update Projects card (index 0) to show User Stake
        if (statsStats[0]) {
            const stakeAmt = stake ? Number(stake.amount.value) : 0;
            statsStats[0].innerText = `${formatTokenAmount(stakeAmt)}`;
            statsStats[0].parentElement.querySelector('p').innerText = 'Your Stake';
        }
    };

    await updateStats();
};
