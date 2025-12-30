# StacksOrangeVault

StacksOrangeVault is a premium DeFi and NFT suite built on the Stacks blockchain. It provides a secure and intuitive platform for staking, launchpad participation, and NFT marketplace interactions.

## 🚀 Overview

The StacksOrangeVault ecosystem consists of several core components designed to leverage the security of Bitcoin through the Stacks layer:

- **Vault Staking**: Stake your tokens to earn rewards in a secure vault environment.
- **Orange Launchpad**: Participate in vetted token launches within the Stacks ecosystem.
- **NFT Marketplace**: Buy, sell, and trade unique digital assets.
- **Quest System**: Engage with the community and earn rewards through on-chain quests.

## 🏗️ Architecture

The project is structured as a monorepo:

- `/contracts`: Clarity smart contracts, deployment scripts, and tests managed with Clarinet.
- `/frontend`: A modern, high-performance web interface built with Next.js (App Router), Stacks.js (v7), and Tailwind CSS.

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Clarinet](https://github.com/hirosystems/clarinet) (for smart contract development)
- [Leather Wallet](https://leather.io/) or [Xverse Wallet](https://www.xverse.app/)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:3000`.

### Smart Contracts

```bash
cd contracts
clarinet check
clarinet test
```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ✨ Authors

Authored by **cryptoflops**.
