import { Blockchain } from "./classes/blockchain";
import { Transaction } from "./classes/transaction";
import { BlockMerkleTree } from "./classes/blockMerkleTree";

// Initialize blockchain with difficulty 2
const blockchain = new Blockchain(2);

// Create multiple transaction objects
const tx1: Transaction = new Transaction("Alice", "Bob", 100);
const tx2: Transaction = new Transaction("Bob", "Charlie", 50);
const tx3: Transaction = new Transaction("Charlie", "David", 75);
const tx4: Transaction = new Transaction("David", "Alice", 25);

// Create first block with transactions 1 and 2
const merkleTree1: BlockMerkleTree = new BlockMerkleTree([tx1, tx2]);
blockchain.addBlock(merkleTree1);

// Create second block with transactions 3 and 4
const merkleTree2: BlockMerkleTree = new BlockMerkleTree([tx3, tx4]);
blockchain.addBlock(merkleTree2);

// Create some more transactions
const tx5: Transaction = new Transaction("Alice", "David", 150);
const tx6: Transaction = new Transaction("Charlie", "Bob", 80);

// Add third block
const merkleTree3: BlockMerkleTree = new BlockMerkleTree([tx5, tx6]);
blockchain.addBlock(merkleTree3);

// Print the entire blockchain
console.log("\nPrinting the entire blockchain:");
blockchain.printBlockchain();

// Validate the blockchain
console.log("\nValidating the blockchain:");
blockchain.validateBlockchain();
