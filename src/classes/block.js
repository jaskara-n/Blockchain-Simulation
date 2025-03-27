"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
class Block {
    // This is not a good practice but it is just for the sake of the assignment.
    constructor(header, merkleTree, prevBlock) {
        this.header = header;
        this.merkleTree = merkleTree;
        this.prevBlock = prevBlock;
    }
}
exports.Block = Block;
