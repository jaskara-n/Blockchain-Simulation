# Blockchain Simulation

A TypeScript implementation of a blockchain system that demonstrates core blockchain concepts including blocks, transactions, and Merkle trees.

## Features

- **Block Structure**: Implementation of blockchain blocks with headers containing block hash, previous block hash, timestamp, nonce, and Merkle root
- **Transaction System**: Handles transactions with sender, receiver, and value information
- **Merkle Tree**: Implements a Merkle tree structure for efficient transaction verification
- **Cryptographic Security**: Uses SHA256 hashing for block and transaction security

## Project Structure

```
├── src/
│   ├── index.ts    # Main implementation file
│   └── index.js    # Compiled JavaScript output
├── package.json
└── tsconfig.json
```

## Technical Implementation

### Transaction

Each transaction contains:

- Sender address (`msgSender`)
- Receiver address (`msgReceiver`)
- Transaction amount (`msgValue`)
- Transaction hash (`txHash`)

### Block

Blocks consist of:

- Block header with metadata
- Merkle tree of transactions
- Cryptographic links to previous blocks

### Merkle Tree

Implements a binary tree structure for transaction verification with:

- Transaction hashing
- Tree construction
- Root hash calculation

## Getting Started

### Prerequisites

- Node.js
- TypeScript
- pnpm (or npm/yarn)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

### Development

Compile TypeScript:

```bash
pnpm run build
```

Run the project:

```bash
pnpm start
```
