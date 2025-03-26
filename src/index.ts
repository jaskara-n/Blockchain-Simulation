import crypto from "crypto";
interface BlockHeader {
  blockHash: string; // Hash of the current block header, i.e. hash of this interface contents for a block.
  previousBlockHash: string;
  timestamp: number; // Time when the block is created.
  nonce: number; // Number only used once(miners compute and compete for this number).
  merkleRoot: string; // Hash of the root node of the merkle tree.
}

class Transaction {
  msgSender: string; // msg.sender of the transaction.
  msgReceiver: string;
  msgValue: number;
  txHash: string; // Hash of the transaction.
  constructor(msgSender: string, msgReceiver: string, msgValue: number) {
    this.msgSender = msgSender;
    this.msgReceiver = msgReceiver;
    this.msgValue = msgValue;
    this.txHash = this.computeTxHash(msgSender, msgReceiver, msgValue);
  }

  // Computes the hash of a transaction.
  private computeTxHash(
    sender: string,
    receiver: string,
    amount: number
  ): string {
    return stringToSHA256(sender + receiver + amount);
  }
}

class BlockMerkleTree {
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
    const parentNodeHashes: string[] = [];
    for (let i = 0; i < transactions.length; i += 2) {
      parentNodeHashes.push(currentTxHash);
    }
  }
}

class Block {
  header: BlockHeader;
  merkleTree: BlockMerkleTree;
  constructor(header: BlockHeader, merkleTree: BlockMerkleTree) {
    this.header = header;
    this.merkleTree = merkleTree;
  }
}

class Blockchain {
  // tail:Block: | null;
  // constructor() {
  //   this.head = new Block(null, null);
  //   this.tail = null;
  // }
}

// Utility function to convert a string to SHA256 hash.
function stringToSHA256(input: string): string {
  const hash = crypto.createHash("sha256");
  hash.update(input);
  return hash.digest("hex");
}

console.log(stringToSHA256("hello"));
