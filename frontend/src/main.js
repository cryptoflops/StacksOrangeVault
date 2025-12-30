import { initWalletUI } from './hooks/wallet-ui.js';
import { initStakingPage } from './hooks/staking-logic.js';
import { initMarketplacePage } from './hooks/marketplace-logic.js';
import { initQuestsPage } from './hooks/quest-logic.js';
import { initHomePage } from './hooks/home-logic.js';
import { initLaunchpadPage } from './hooks/launchpad-logic.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Header
    const headerRoot = document.getElementById('header-root');
    if (headerRoot) {
        fetch('../components/Header.html')
            .then(res => res.text())
            .then(html => {
                headerRoot.innerHTML = html;
                initWalletUI(); // Initialize wallet interactions after header loads

                // Route-specific initialization
                if (window.location.pathname.includes('staking.html')) {
                    initStakingPage();
                } else if (window.location.pathname.includes('marketplace.html')) {
                    initMarketplacePage();
                } else if (window.location.pathname.includes('quests.html')) {
                    initQuestsPage();
                } else if (window.location.pathname.includes('launchpad.html')) {
                    initLaunchpadPage();
                } else if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
                    initHomePage();
                }
            });
    }
});
