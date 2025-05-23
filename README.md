# ChainVote - Decentralized Voting & Polling DApp

## About The Project

**ChainVote** is a decentralized voting and polling application built on blockchain technology, designed such a way to ensure transparency, security, and immutability in the voting process. It eliminates the risks of centralized systems like manipulation, fraud, and lack of transparency by leveraging smart contracts and decentralized networks like ETH.

## Live Demo
[LINK]

## Key Features

1. **Decentralized Governance:** Votes are recorded on-chain and the system does not rely on any central admin to manage elections or polls.
2. **Immutable Records:** Once cast, votes cannot be altered or revert back, ensuring trust in election results.
3. **Transparent Process:** Anyone can verify the votes and results through the public blockchain, enhancing credibility.
4. **Secure & Private Voting:** Uses cryptographic techniques to protect voter identity while maintaining vote uprightness.
5. **Smart Contract Automation:** Automates poll creation, voting deadlines, result calculation, and more without human intervention.
6. **Token or Wallet-Based Access:** Voter eligibility can be controlled using wallet address whitelisting or governance tokens.

## Use Cases

- DAO Governance Voting
- College/University Elections
- Polling for Community Response
- Transparent NGO or Trust Decision-Making
- Corporate Board or Shareholder Reaction

## Built With

- Frontend framework: Next.js
- Smart contracts: Solidity
- Ethereum web client library: Ethers.js
- CSS Framework: TailwindCSS
- Ethereum development environment: Foundry
- Wallet: Metamask (Eth sepolia)

## Getting Started

To get this application up and and running on your local machine follow these simple steps.

## Prerequisites

You need to have Node.js and foundry installed on your computer, before running this project.

Additionally, check you have access to the sepolia testnet:

- Set up a wallet like MetaMask
- Request Sepolia ETH from a Sepolia faucet (https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- You can also use Alchemy or Infura to get a Sepolia RPC URL for deployment

## Installation

1. Clone the repo

   ```
   git clone https://github.com/rakeshkumawat12/ChainVote.git
   ```

2. Install dependencies

   ```
   # Install foundry dependencies
   cd foundry
   forge install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables as mentioned above.

4. Run the application:

   ```
   # Start the frontend server
   cd ../frontend
   npm run dev
   ```

5. Open the app in your browser at http://localhost:3000/

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue. Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request