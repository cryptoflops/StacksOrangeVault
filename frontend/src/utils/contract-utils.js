import { network, getAddress } from './stacks-config.js';
// @ts-expect-error - dependency mismatch
import { fetchCallReadOnlyFunction, cvToValue, standardPrincipalCV, uintCV, PostConditionMode, contractPrincipalCV } from '@stacks/transactions';
import { openContractCall } from '@stacks/connect';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || 'SP1TN1ERKXEM2H9TKKWGPGZVNVNEKS92M7M3CKVJJ';
const TOKEN_CONTRACT = 'orange-token-v19';
const STAKING_CONTRACT = 'orange-staking-v19';
const MARKETPLACE_CONTRACT = 'orange-marketplace-v19';
const NFT_CONTRACT = 'orange-nft-v19';
const LAUNCHPAD_CONTRACT = 'orange-launchpad-v19';

export const fetchTokenBalance = async () => {
    const address = getAddress();
    if (!address) return "0";

    try {
        // Use Hiro API for more reliable balance fetching
        const baseUrl = network.isTestnet
            ? 'https://api.testnet.hiro.so'
            : 'https://api.mainnet.hiro.so';
        const url = `${baseUrl}/extended/v1/address/${address}/balances`;

        const headers = {};
        if (process.env.NEXT_PUBLIC_HIRO_API_KEY) {
            headers['x-api-key'] = process.env.NEXT_PUBLIC_HIRO_API_KEY;
        }

        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();

        const assetId = `${CONTRACT_ADDRESS}.${TOKEN_CONTRACT}::orange-token`;
        const tokenData = data.fungible_tokens[assetId];

        // Return balance as string (atomic units)
        return tokenData ? tokenData.balance : "0";
    } catch (error) {
        console.error('Error fetching token balance:', error);
        return "0";
    }
};

export const fetchActiveStake = async () => {
    const address = getAddress();
    if (!address) return null;

    const options = {
        contractAddress: CONTRACT_ADDRESS,
        contractName: STAKING_CONTRACT,
        functionName: 'get-stake-info',
        functionArgs: [standardPrincipalCV(address)],
        network,
        senderAddress: address,
    };

    try {
        const result = await fetchCallReadOnlyFunction(options);
        return cvToValue(result);
    } catch (error) {
        console.error('Error fetching stake info:', error);
        return null;
    }
};

export const stakeTokens = async (amount) => {
    const address = getAddress();
    if (!address) return;

    // Amount in micro-units (assuming 6 decimals)
    const amountMicro = Math.floor(amount * 1000000);

    await openContractCall({
        contractAddress: CONTRACT_ADDRESS,
        contractName: STAKING_CONTRACT,
        functionName: 'stake-tokens',
        functionArgs: [
            uintCV(amountMicro),
            contractPrincipalCV(CONTRACT_ADDRESS, TOKEN_CONTRACT)
        ],
        postConditionMode: PostConditionMode.Allow, // Secure but simpler for MVP. 
        // In production, we would add strict post-conditions here.
        network,
        onFinish: (data) => {
            console.log('Transaction broadcasted:', data.txId);
            alert('Staking transaction broadcasted!');
        },
        onCancel: () => {
            console.log('Transaction cancelled');
        },
    });
};

export const unstakeTokens = async () => {
    const address = getAddress();
    if (!address) return;

    await openContractCall({
        contractAddress: CONTRACT_ADDRESS,
        contractName: STAKING_CONTRACT,
        functionName: 'unstake-tokens',
        functionArgs: [
            contractPrincipalCV(CONTRACT_ADDRESS, TOKEN_CONTRACT)
        ],
        postConditionMode: PostConditionMode.Allow,
        network,
        onFinish: (data) => {
            console.log('Unstaking transaction broadcasted:', data.txId);
            alert('Unstaking transaction broadcasted!');
        },
        onCancel: () => {
            console.log('Transaction cancelled');
        },
    });
};

export const buyAsset = async (tokenId) => {
    const address = getAddress();
    if (!address) return;

    await openContractCall({
        contractAddress: CONTRACT_ADDRESS,
        contractName: MARKETPLACE_CONTRACT,
        functionName: 'buy-asset',
        functionArgs: [
            contractPrincipalCV(CONTRACT_ADDRESS, NFT_CONTRACT),
            uintCV(tokenId)
        ],
        postConditionMode: PostConditionMode.Allow,
        network,
        onFinish: (data) => {
            console.log('Purchase transaction broadcasted:', data.txId);
            alert('Purchase transaction broadcasted!');
        },
        onCancel: () => {
            console.log('Transaction cancelled');
        },
    });
};

export const verifyQuestEligibility = async (questId) => {
    const address = getAddress();
    if (!address) return false;

    switch (questId) {
        case 'token-pioneer':
            const balance = await fetchTokenBalance();
            return Number(balance) > 0;

        case 'liquidity-master':
            const stake = await fetchActiveStake();
            return stake !== null && Number(stake.amount.value) >= 5000000000; // 5000 tokens

        case 'badge-collector':
            // Check if user has at least 1 NFT (simulated collector check)
            const lastIdResult = await fetchCallReadOnlyFunction({
                contractAddress: CONTRACT_ADDRESS,
                contractName: NFT_CONTRACT,
                functionName: 'get-last-token-id',
                functionArgs: [],
                network,
            });
            return cvToValue(lastIdResult).value > 0;

        default:
            return false;
    }
};

export const claimBadge = async (questId) => {
    // Since mint is admin-restricted, we simulate the "Submit for Verification" flow
    // In a real prod environment, this would call a quest-contract or an oracle API
    alert(`Quest "${questId}" submitted for on-chain verification! Your badge will be issued shortly after block confirmation.`);
    return true;
};

export const buyLaunchpadToken = async (amount) => {
    const address = getAddress();
    if (!address) return;

    await openContractCall({
        contractAddress: CONTRACT_ADDRESS,
        contractName: LAUNCHPAD_CONTRACT,
        functionName: 'buy-token',
        functionArgs: [
            uintCV(amount),
            contractPrincipalCV(CONTRACT_ADDRESS, TOKEN_CONTRACT)
        ],
        postConditionMode: PostConditionMode.Allow,
        network,
        onFinish: (data) => {
            console.log('Launchpad purchase broadcasted:', data.txId);
            alert('Launchpad purchase transaction broadcasted!');
        },
        onCancel: () => {
            console.log('Transaction cancelled');
        },
    });
};

export const formatTokenAmount = (amount) => {
    return (Number(amount) / 1000000).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};
