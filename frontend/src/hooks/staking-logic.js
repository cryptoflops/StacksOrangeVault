import { userSession } from '../utils/stacks-config.js';
import { fetchTokenBalance, fetchActiveStake, stakeTokens, unstakeTokens, formatTokenAmount } from '../utils/contract-utils.js';

export const initStakingPage = async () => {
    const balanceDisplay = document.getElementById('token-balance');
    const stakeInput = document.getElementById('stake-amount');
    const maxBtn = document.getElementById('max-btn');
    const stakeBtn = document.getElementById('stake-btn');
    const activeStakeDisplay = document.getElementById('active-stake-amount');
    const unstakeBtn = document.getElementById('unstake-btn');

    const updateUI = async () => {
        if (userSession.isUserSignedIn()) {
            // 1. Fetch Balance
            const rawBalance = await fetchTokenBalance();
            const formattedBalance = formatTokenAmount(rawBalance);
            if (balanceDisplay) {
                balanceDisplay.innerText = `Balance: ${formattedBalance} ORANGE`;
            }

            // 2. Fetch Active Stake
            const activeStake = await fetchActiveStake();
            if (activeStake && activeStakeDisplay) {
                activeStakeDisplay.innerText = `${formatTokenAmount(activeStake.amount.value)} ORANGE`;
            }

            return rawBalance;
        }
        return 0;
    };

    const rawBalance = await updateUI();

    if (maxBtn && stakeInput) {
        maxBtn.onclick = () => {
            stakeInput.value = Number(rawBalance) / 1000000;
        };
    }

    if (stakeBtn && stakeInput) {
        stakeBtn.onclick = async () => {
            const amount = parseFloat(stakeInput.value);
            if (isNaN(amount) || amount <= 0) {
                alert('Please enter a valid amount');
                return;
            }
            await stakeTokens(amount);
        };
    }

    if (unstakeBtn) {
        unstakeBtn.onclick = async () => {
            if (confirm('Are you sure you want to unstake all tokens?')) {
                await unstakeTokens();
            }
        };
    }
};
