export interface BlockHeader {
  blockHash: string; // Hash of the current block header, i.e. hash of this interface keys for a block.
  blockNumber: number; // Block number of the current block, i.e. index.
  previousBlockHash: string;
  timestamp: number; // Time when the block is created.
  nonce: number; // Number only used once(miners compute and compete for this number).
  merkleRoot: string; // Hash of the root node of the merkle tree.
}
