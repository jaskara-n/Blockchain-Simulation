"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utilities/utils");
class Transaction {
    constructor(msgSender, msgReceiver, msgValue) {
        this.msgSender = msgSender;
        this.msgReceiver = msgReceiver;
        this.msgValue = msgValue;
        this.txHash = this.computeTxHash(msgSender, msgReceiver, msgValue);
    }
    // Computes the hash of a transaction.
    computeTxHash(sender, receiver, amount) {
        return (0, utils_1.stringToSHA256)(sender + receiver + amount);
    }
}
class BlockMerkleTree {
    constructor(transactions) {
        // ^^ Tx data in the form of array or classes of all transactions in the block
        this.merkleRoot = this.buildMerkleTreeHash(transactions);
    }
    // Builds a merkle tree, given a list of transaction hashes and returns merkle tree root hash.
    buildMerkleTreeHash(transactions) {
        if (transactions.length === 0) {
            console.error("It is a binary tree hence only even number of transactions are allowed.");
        }
        // Extract tx hashes from the transactions.
        let txHashes = transactions.map((tx) => tx.txHash);
        // A while loop, till transaction length is only one, that is the root hash.
        while (txHashes.length > 1) {
            const parentNodeHashes = [];
            // For loop for pushing 2 adjacent hashes into the parent node array.
            for (let i = 0; i < txHashes.length; i += 2) {
                const hashOne = txHashes[i];
                const hashTwo = txHashes[i + 1];
                parentNodeHashes.push((0, utils_1.stringToSHA256)(hashOne + hashTwo));
            }
            txHashes = parentNodeHashes;
        }
        return txHashes[0];
    }
}
class Block {
    // This is not a good practice but it is just for the sake of the assignment.
    constructor(header, merkleTree, prevBlock) {
        this.header = header;
        this.merkleTree = merkleTree;
        this.prevBlock = prevBlock;
    }
}
class Blockchain {
    constructor(difficulty) {
        this.tail = null;
        this.head = null;
        this.currentBlockNumber = 0;
        this.difficulty = difficulty;
    }
    addBlock(merkleTree) {
        const previousBlockHashed = this.head
            ? this.head.header.blockHash
            : "Genesis Block";
        const timestamp = Date.now();
        const thisBlockHashAndNonce = this.mineBlockAndReturnHashAndNonce(previousBlockHashed, this.currentBlockNumber, timestamp, merkleTree.merkleRoot);
        const blockHeader = {
            blockHash: thisBlockHashAndNonce.hash,
            blockNumber: this.currentBlockNumber,
            previousBlockHash: previousBlockHashed,
            timestamp: timestamp,
            nonce: thisBlockHashAndNonce.nonce,
            merkleRoot: merkleTree.merkleRoot,
        };
        const block = new Block(blockHeader, merkleTree, this.head);
        this.currentBlockNumber++;
        if (this.tail == null) {
            // Genesis block creation.
            this.head = block;
            this.tail = block;
            block.header.previousBlockHash = previousBlockHashed;
        }
        else {
            this.head = block;
            block.header.previousBlockHash = this.head.header.blockHash;
        }
    }
    mineBlockAndReturnHashAndNonce(previousBlockHash, blockNumber, timestamp, merkleRoot) {
        let prefix = "0".repeat(this.difficulty);
        let nonce = 0;
        let hash = "";
        while (true) {
            hash = (0, utils_1.stringToSHA256)(previousBlockHash + blockNumber + timestamp + merkleRoot + nonce);
            if (hash.startsWith(prefix)) {
                break;
            }
            else {
                nonce++;
            }
        }
        return { hash, nonce };
    }
    // Traversal of singly linked list.
    printBlockchain() {
        let current = this.head;
        while (current) {
            console.log("BLOCK HEADER");
            console.log(`Block Number: ${current.header.blockNumber}`);
            console.log(`Block Hash: ${current.header.blockHash}`);
            console.log(`Previous Block Hash: ${current.header.previousBlockHash}`);
            console.log(`Merkle Root: ${current.merkleTree.merkleRoot}`);
            console.log(`Timestamp: ${current.header.timestamp}`);
            console.log(`Nonce: ${current.header.nonce}`);
            console.log("----------------------------");
            current = current.prevBlock;
        }
    }
    validateBlockchain() {
        let current = this.head;
        while (current && current.prevBlock) {
            const computedHash = (0, utils_1.stringToSHA256)(current.header.previousBlockHash +
                current.header.blockNumber +
                current.header.timestamp +
                current.header.merkleRoot +
                current.header.nonce);
            if (computedHash !== current.header.blockHash) {
                console.error(`Block ${current.header.blockNumber} has an invalid hash`);
                return false;
            }
            if (current.header.previousBlockHash !== current.prevBlock.header.blockHash) {
                console.error(`Block ${current.header.blockNumber} has an incorrect previous block reference`);
                return false;
            }
            current = current.prevBlock;
        }
        console.log("Blockchain is valid");
        return true;
    }
}
// Utility function to convert a string to SHA256 hash.
const blockchain = new Blockchain(2);
const tx1 = new Transaction("Alice", "Bob", 100);
const tx2 = new Transaction("Bob", "Alice", 50);
const tx3 = new Transaction("Charlie", "Alice", 200);
const tx4 = new Transaction("Alice", "Bob", 75);
const merkleTree = new BlockMerkleTree([tx1, tx2, tx3, tx4]);
blockchain.addBlock(merkleTree);
blockchain.addBlock(merkleTree);
blockchain.addBlock(merkleTree);
blockchain.printBlockchain();
