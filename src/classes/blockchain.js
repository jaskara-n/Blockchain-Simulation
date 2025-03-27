"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blockchain = void 0;
const utils_1 = require("../utilities/utils");
const block_1 = require("../classes/block");
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
        const block = new block_1.Block(blockHeader, merkleTree, this.head);
        this.currentBlockNumber++;
        if (this.tail == null) {
            // Genesis block creation.
            this.head = block;
            this.tail = block;
            block.header.previousBlockHash = previousBlockHashed;
        }
        else {
            block.header.previousBlockHash = this.head.header.blockHash;
            this.head = block;
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
exports.Blockchain = Blockchain;
