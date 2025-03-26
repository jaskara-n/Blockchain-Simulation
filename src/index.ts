interface BlockHeader {
  blockHash: string; // Hash of the current block header, i.e. hash of this interface contents for a block.
  previousBlockHash: string;
  timestamp: number; // Time when the block is created.
  nonce: number; // Number only used once(miners compute and compete for this number).
  merkleRoot: string; // Hash of the root node of the merkle tree.
}

class BlockMerkleTree {
  merkleRoot: string;
  constructor(transactions: string[]) {
    // ^^ Tx hashes of all transactions in the block
    this.merkleRoot = buildMerkleTreeHash(transactions);
  }
}
// Builds a merkle tree, given a list of transaction hashes and returns merkle tree root hash.
function buildMerkleTreeHash(txHashes: string[]): string {
  return "yolo";
}

class Block {
  header: BlockHeader;
  merkleTree: BlockMerkleTree;
  constructor(header: BlockHeader, merkleTree: BlockMerkleTree) {
    this.header = header;
    this.merkleTree = merkleTree;
  }
}

class Blockchain {}
