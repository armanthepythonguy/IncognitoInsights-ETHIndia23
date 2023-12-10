# Incognito Insight

## Overview

Incognito Insight is a platform designed to address the challenge of proving on-chain activities without exposing wallet addresses. It allows users to create challenges where participants prove their transactions and profits within certain constraints without revealing their actual addresses.

## How It Works

1. **Challenge Creation:**
   - You, as a challenge creator, can specify constraints for the challenge, such as using a particular DeFi protocol (e.g., UniSwap), swapping specific assets, achieving a certain profit percentage, and a time frame (e.g., the last month).

2. **Prover's Participation:**
   - Participants (Provers) provide their wallet addresses that have conducted transactions meeting the challenge criteria.

3. **Platform Verification:**
   - The platform checks the provided wallet addresses to ensure they meet the specified constraints, such as the type of transactions, profit percentage, and timeframe.

4. **Signing Proof:**
   - Once verified, the platform creates a payload containing the prover's profits, challenge details, and other relevant information. The prover signs this payload, creating a secure proof.

5. **Verification by Challenge Creator:**
   - The challenge creator can then verify the proof without the need for the prover to expose their actual address, preserving their transaction strategy.

## Network Addresses

- **Sepolia:** 0x634F9Bc798A228C6Ed8fD4A14A2b907498146809
- **Polygon zkEVM:** 0x19488ecE9278fE70aD73952C35835Ac233689154
- **Scroll Sepolia:** 0xC0eB65078d6b7047e92a10807Bd4348765953190
- **Base Goerli:** 0x79277f2f6C9B502971E8127B12f59FFD945e4e16
- **Arbitrum Sepolia:** 0x2A67Cf654F8EE1660639938BE9f3e30522A443b6
- **Mantle testnet:** 0x2A67Cf654F8EE1660639938BE9f3e30522A443b6
- **Alfajores Celo:** 0xC0d4E2C80863e8806CD5D596429102341bC49690
- **OKX:** 0x2A67Cf654F8EE1660639938BE9f3e30522A443b6

## Folder Structure

- **./contracts:** Contains all smart contracts related to the Incognito Insight platform.
- **./app:** Frontend code for the platform.
- **./backend:** Backend code responsible for the platform's functionality.
- **./circuits:** Code for Zero-Knowledge Proof (ZKP) circuits, ensuring secure and private verification.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/incognito-insight.git
cd incognito-insight
```

2. Install dependencies for frontend and backend:

```bash
# Frontend
cd app
npm install

# Backend
cd ../backend
npm install
```

3. Run the application:

```bash
# Frontend
cd ../app
npm start

# Backend
cd ../backend
node index.js
```

## Contributing

We welcome contributions to enhance and improve Incognito Insight. Please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
