"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class BlockMerkleTree {
    constructor(transactions) {
        // ^^ Tx hashes of all transactions in the block
        this.merkleRoot = this.buildMerkleTreeHash(transactions);
    }
    // Builds a merkle tree, given a list of transaction hashes and returns merkle tree root hash.
    buildMerkleTreeHash(txHashes) {
        return "yolo";
    }
}
class Block {
    constructor(header, merkleTree) {
        this.header = header;
        this.merkleTree = merkleTree;
    }
}
class Blockchain {
}
// Utility function to convert a string to SHA256 hash.
function stringToSHA256(input) {
    const hash = crypto_1.default.createHash("sha256");
    hash.update(input);
    return hash.digest("hex");
}
console.log(stringToSHA256("hello"));
