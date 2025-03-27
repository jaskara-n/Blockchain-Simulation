"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockMerkleTree = void 0;
const utils_1 = require("../utilities/utils");
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
exports.BlockMerkleTree = BlockMerkleTree;
