# StacksOrangeVault

## Project Overview
- **Name:** StacksOrangeVault
- **Tagline:** “Secure, Reward, and Empower the Bitcoin L2 Ecosystem.”
- **Status:** **PRODUCTION (MAINNET)**
- **Target Network:** Stacks Testnet (Nakamoto Epoch 2.5)

## Core Functionality 
- **Quest Protocol**: Users complete off-chain/on-chain actions to earn **Soulbound Badges** (Non-transferable NFTs).
- **Orange Token (SIP-010)**: The core utility token for rewards and governance.
- **Yield Staking**: Locked staking of Orange Tokens to earn rewards and access premium tiers.
- **Marketplace**: A decentralized exchange for trading project-related NFTs.
- **Launchpad**: Decentralized token/NFT issuance for ecosystem projects.
- **Multisig Vault**: Highly secure administrative control for treasury and contract management.

## Technical Architecture
- **Language**: Clarity 2.0 (Nakamoto-compatible)
- **Pattern**: **Caller-Identity Pattern** (V19). Removes legacy `as-contract` dependency to ensure compatibility with modern Stacks consensus and high-speed blocks.
- **Authentication**: Reown AppKit integrated with Stacks.js.
- **Blockchain**: Stacks (Bitcoin Layer 2).

## Deployment Details (v19 - Final)
- **Mainnet Principal**: `SP1TN1ERKXEM2H9TKKWGPGZVNVNEKS92M7M3CKVJJ`
- **Network Setting**: Clarity 1 / Epoch 2.05 (Production Final)

### Live Contracts
1.  **FT Trait**: `orange-sip010-ft-trait-v19`
2.  **NFT Trait**: `orange-sip009-nft-trait-v19`
3.  **Orange Token**: `orange-token-v19`
4.  **Orange NFT**: `orange-nft-v19`
5.  **Launchpad**: `orange-launchpad-v19`
6.  **Marketplace**: `orange-marketplace-v19`
7.  **Staking**: `orange-staking-v19`
8.  **Multisig**: `orange-multisig-v19`

## Visual Direction 
- **Theme**: "Bionic Orange" — Sleek dark mode interfaces paired with vibrant, high-contrast orange accents. 
- **Design System**: Glassmorphism components, smooth CSS transitions, and Bitcoin-centric typography.
- **UX Goal**: Creating a premium, "wow-factor" experience that makes complex DeFi/NFT interactions feel simple and rewarding.

## Roadmap
- [x] Phase 1: Architecture Design
- [x] Phase 2: Clarity 2 / Nakamoto Smart Contract Implementation
- [x] Phase 3: Successful Testnet Deployment (v19)
- [ ] Phase 4: Frontend Integration & AppKit Auth
- [ ] Phase 5: Quest Logic & Soulbound Verification
- [ ] Phase 6: Mainnet Launch
