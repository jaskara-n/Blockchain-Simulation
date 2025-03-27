"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain_1 = require("./classes/blockchain");
const transaction_1 = require("./classes/transaction");
const blockMerkleTree_1 = require("./classes/blockMerkleTree");
// Initialize blockchain with difficulty 2
const blockchain = new blockchain_1.Blockchain(2);
// Create multiple transaction objects
const tx1 = new transaction_1.Transaction("Alice", "Bob", 100);
const tx2 = new transaction_1.Transaction("Bob", "Charlie", 50);
const tx3 = new transaction_1.Transaction("Charlie", "David", 75);
const tx4 = new transaction_1.Transaction("David", "Alice", 25);
// Create first block with transactions 1 and 2
const merkleTree1 = new blockMerkleTree_1.BlockMerkleTree([tx1, tx2]);
blockchain.addBlock(merkleTree1);
// Create second block with transactions 3 and 4
const merkleTree2 = new blockMerkleTree_1.BlockMerkleTree([tx3, tx4]);
blockchain.addBlock(merkleTree2);
// Create some more transactions
const tx5 = new transaction_1.Transaction("Alice", "David", 150);
const tx6 = new transaction_1.Transaction("Charlie", "Bob", 80);
// Add third block
const merkleTree3 = new blockMerkleTree_1.BlockMerkleTree([tx5, tx6]);
blockchain.addBlock(merkleTree3);
// Print the entire blockchain
console.log("\nPrinting the entire blockchain:");
blockchain.printBlockchain();
// Validate the blockchain
console.log("\nValidating the blockchain:");
blockchain.validateBlockchain();
