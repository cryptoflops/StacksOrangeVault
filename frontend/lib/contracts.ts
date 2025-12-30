import { STACKS_MOCKNET, STACKS_TESTNET, STACKS_MAINNET } from '@stacks/network';

// Configuration
// TODO: Switch this based on environment
export const NETWORK = STACKS_MOCKNET;

// Contract Addresses (Devnet default for `clarinet integrate`)
// In a real app, these should be env vars
export const DEPLOYER_ADDRESS = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';

export const CONTRACTS = {
    TOKEN: `${DEPLOYER_ADDRESS}.orange-token`,
    NFT: `${DEPLOYER_ADDRESS}.orange-nft`,
    LAUNCHPAD: `${DEPLOYER_ADDRESS}.orange-launchpad`,
    MARKETPLACE: `${DEPLOYER_ADDRESS}.orange-marketplace`,
    MULTISIG: `${DEPLOYER_ADDRESS}.orange-multisig`,
    STAKING: `${DEPLOYER_ADDRESS}.orange-staking`,
};

export const MICROSTACKS_PER_STX = 1_000_000;
