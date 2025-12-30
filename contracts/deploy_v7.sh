#!/bin/bash

echo "🚀 Deploying Stacks DeFi & NFT Suite v7..."

# 1. Traits
clarinet contract publish orange-sip010-ft-trait-v7 --testnet --clarity-version 2
clarinet contract publish orange-sip009-nft-trait-v7 --testnet --clarity-version 2

# 2. Assets
clarinet contract publish orange-token-v7 --testnet --clarity-version 2
clarinet contract publish orange-nft-v7 --testnet --clarity-version 2

# 3. Core Logic (The ones that use as-contract)
clarinet contract publish orange-launchpad-v7 --testnet --clarity-version 2
clarinet contract publish orange-staking-v7 --testnet --clarity-version 2
clarinet contract publish orange-marketplace-v7 --testnet --clarity-version 2

# 4. Utilities
clarinet contract publish orange-multisig-v7 --testnet --clarity-version 2

echo "✅ All publish commands issued! Check the explorer."
