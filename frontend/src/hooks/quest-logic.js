import { userSession } from '../utils/stacks-config.js';
import { verifyQuestEligibility, claimBadge } from '../utils/contract-utils.js';

export const initQuestsPage = () => {
    const questCards = document.querySelectorAll('.quest-card');

    // Mapping of titles to IDs for the mock data
    const questMap = {
        'Token Pioneer': 'token-pioneer',
        'Liquidity Master': 'liquidity-master',
        'Badge Collector': 'badge-collector'
    };

    questCards.forEach(async (card) => {
        const title = card.querySelector('.quest-title').innerText;
        const questId = questMap[title];
        const actionBtn = card.querySelector('.quest-action-btn');

        if (!questId || !actionBtn) return;

        if (!userSession.isUserSignedIn()) {
            actionBtn.onclick = () => alert('Please connect your wallet to participate in quests.');
            return;
        }

        // Check Eligibility
        const isEligible = await verifyQuestEligibility(questId);

        if (isEligible) {
            actionBtn.innerText = 'Claim Badge';
            actionBtn.classList.add('eligible');
            actionBtn.style.background = 'var(--color-success)';

            actionBtn.onclick = async () => {
                await claimBadge(questId);
                actionBtn.innerText = 'Verifying...';
                actionBtn.disabled = true;
            };
        } else {
            actionBtn.onclick = () => {
                alert(`You haven't met the requirements for this quest yet. Check the description to see what's needed!`);
            };
        }
    });
};
