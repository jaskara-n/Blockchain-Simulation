# Blockchain Simulation Project

A TypeScript implementation of a basic blockchain system demonstrating core blockchain concepts including Proof of Work (PoW) consensus, Merkle trees, and cryptographic hashing.

## Project Overview

This project simulates a blockchain with the following key features:

- Proof of Work (PoW) consensus mechanism
- Merkle tree for transaction verification
- SHA-256 cryptographic hashing
- Block validation and chain integrity checks
- Singly linked list data structure for the blockchain

## Core Components

### Blockchain Structure

The blockchain is implemented as a singly linked list where each block points to its previous block. This structure allows for:

- Efficient block traversal
- Easy chain validation
- Immutable history of transactions

Key classes:

```typescript
class Blockchain {
  tail: Block | null; // Genesis block
  head: Block | null; // Latest block
  currentBlockNumber: number;
  difficulty: number; // Mining difficulty
}
```

### Block Structure

Each block contains:

- Block header with metadata
- Merkle tree of transactions
- Reference to previous block

```typescript
interface BlockHeader {
  blockHash: string;
  blockNumber: number;
  previousBlockHash: string;
  timestamp: number;
  nonce: number;
  merkleRoot: string;
}
```

### Merkle Tree

Transactions in each block are organized in a binary Merkle tree structure:

- Provides efficient verification of transaction inclusion
- Enables quick detection of data tampering
- Reduces storage and verification costs

## Consensus Mechanism

### Proof of Work (PoW)

The project implements a basic PoW consensus mechanism:

1. **Mining Process**:

   - Miners must find a nonce that produces a block hash with a specific number of leading zeros
   - Difficulty level determines required leading zeros
   - Higher difficulty means more computational work needed

2. **Block Validation**:
   - Verifies block hash meets difficulty requirement
   - Confirms previous block reference is valid
   - Checks Merkle root matches transactions

```typescript
// Mining implementation
mineBlockAndReturnHashAndNonce(previousBlockHash: string, blockNumber: number,
    timestamp: number, merkleRoot: string): { hash: string; nonce: number } {
    let prefix: string = "0".repeat(this.difficulty);
    let nonce: number = 0;
    let hash: string = "";

    while (true) {
        hash = stringToSHA256(
            previousBlockHash + blockNumber + timestamp + merkleRoot + nonce
        );
        if (hash.startsWith(prefix)) break;
        nonce++;
    }

    return { hash, nonce };
}
```

## Security Features

1. **Cryptographic Hashing**:

   - Uses SHA-256 for all hash operations
   - Ensures data integrity and immutability
   - Applied to transactions, blocks, and Merkle trees

2. **Chain Validation**:
   - Validates entire blockchain integrity
   - Verifies block references and hash values
   - Ensures no tampering has occurred

## Project Structure

```
src/
  ├── classes/
  │   ├── block.ts           # Block class implementation
  │   ├── blockMerkleTree.ts # Merkle tree implementation
  │   ├── blockchain.ts      # Main blockchain logic
  │   └── transaction.ts     # Transaction class
  ├── interfaces/
  │   └── blockHeader.ts     # Block header interface
  ├── utilities/
  │   └── utils.ts           # Utility functions
  └── nodeOperations.ts      # Example operations
```

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/jaskara-n/Blockchain-Simulation.git
cd Blockchain-Simulation
```

2. Install dependencies:

```bash
pnpm install  # or npm install
```

3. Run build:

```bash
pnpm build  # or npm install
```

4. Run the demo(nodeOperations.ts):

```bash
pnpm start  # or npm start
```

This will execute the nodeOperations.ts file which demonstrates the blockchain in action by creating multiple blocks with transactions, adding them to the chain, and validating the entire blockchain.

### Sample Output

When you run the demo, you'll see output similar to this:

```
Printing the entire blockchain:
BLOCK HEADER
Block Number: 2
Block Hash: 009d2cf03977bfca6df8103f1a6a866ecc26703540464965148843cd50264282
Previous Block Hash: 000b7c1812eb723216acb968026062d94ba1a4ebe9c8e9c3bf8d4c6c47fd225e
Merkle Root: 17ec3dc2c193c7106455e357a3db7519775b69fd68220f2f5d11b35520769b1c
Timestamp: 1743086528261
Nonce: 228
----------------------------
BLOCK HEADER
Block Number: 1
Block Hash: 000b7c1812eb723216acb968026062d94ba1a4ebe9c8e9c3bf8d4c6c47fd225e
Previous Block Hash: 004b037fea60199526b778a9a153d5a6dc8b11bcfd5d055bb3d779c779d8649d
Merkle Root: eca90b0cc10eb39d29ae432fd49863563904f3837271b82b6aab38e80dc2eb3a
Timestamp: 1743086528260
Nonce: 695
----------------------------
BLOCK HEADER
Block Number: 0
Block Hash: 004b037fea60199526b778a9a153d5a6dc8b11bcfd5d055bb3d779c779d8649d
Previous Block Hash: Genesis Block
Merkle Root: 02d11e06b3c1735390ad29410a67764c797828e3c56f1408f120eb6d30c243c9
Timestamp: 1743086528260
Nonce: 58
----------------------------

Validating the blockchain:
Blockchain is valid
```

This output shows three blocks in the chain, each with its header information including block number, hash values, merkle root, timestamp, and nonce. The validation at the end confirms the integrity of the entire blockchain.
