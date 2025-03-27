import { Transaction } from "./transaction";
import { stringToSHA256 } from "../utilities/utils";
export class BlockMerkleTree {
  merkleRoot: string;
  constructor(transactions: Transaction[]) {
    // ^^ Tx data in the form of array or classes of all transactions in the block
    this.merkleRoot = this.buildMerkleTreeHash(transactions);
  }

  // Builds a merkle tree, given a list of transaction hashes and returns merkle tree root hash.
  private buildMerkleTreeHash(transactions: Transaction[]): string {
    if (transactions.length === 0) {
      console.error(
        "It is a binary tree hence only even number of transactions are allowed."
      );
    }
    // Extract tx hashes from the transactions.
    let txHashes: string[] = transactions.map((tx) => tx.txHash);
    // A while loop, till transaction length is only one, that is the root hash.
    while (txHashes.length > 1) {
      const parentNodeHashes: string[] = [];
      // For loop for pushing 2 adjacent hashes into the parent node array.
      for (let i = 0; i < txHashes.length; i += 2) {
        const hashOne: string = txHashes[i];
        const hashTwo: string = txHashes[i + 1];
        parentNodeHashes.push(stringToSHA256(hashOne + hashTwo));
      }
      txHashes = parentNodeHashes;
    }
    return txHashes[0];
  }
}
