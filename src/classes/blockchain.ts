import { stringToSHA256 } from "../utilities/utils";
import { BlockHeader } from "../interfaces/blockHeader";
import { BlockMerkleTree } from "../classes/blockMerkleTree";
import { Block } from "../classes/block";

export class Blockchain {
  // Initialise head and tail of the singly linked list.
  tail: Block | null; // Handle first block.
  head: Block | null; // Handle last block.
  currentBlockNumber: number;
  difficulty: number;
  constructor(difficulty: number) {
    this.tail = null;
    this.head = null;
    this.currentBlockNumber = 0;
    this.difficulty = difficulty;
  }
  addBlock(merkleTree: BlockMerkleTree) {
    const previousBlockHashed: string = this.head
      ? this.head.header.blockHash
      : "Genesis Block";
    const timestamp: number = Date.now();

    const thisBlockHashAndNonce = this.mineBlockAndReturnHashAndNonce(
      previousBlockHashed,
      this.currentBlockNumber,
      timestamp,
      merkleTree.merkleRoot
    );
    const blockHeader: BlockHeader = {
      blockHash: thisBlockHashAndNonce.hash,
      blockNumber: this.currentBlockNumber,
      previousBlockHash: previousBlockHashed,
      timestamp: timestamp,
      nonce: thisBlockHashAndNonce.nonce,
      merkleRoot: merkleTree.merkleRoot,
    };
    const block: Block = new Block(blockHeader, merkleTree, this.head);
    this.currentBlockNumber++;
    if (this.tail == null) {
      // Genesis block creation.
      this.head = block;
      this.tail = block;
      block.header.previousBlockHash = previousBlockHashed;
    } else {
      block.header.previousBlockHash = this.head!.header.blockHash;
      this.head = block;
    }
  }

  mineBlockAndReturnHashAndNonce(
    previousBlockHash: string,
    blockNumber: number,
    timestamp: number,
    merkleRoot: string
  ): { hash: string; nonce: number } {
    let prefix: string = "0".repeat(this.difficulty);
    let nonce: number = 0;
    let hash: string = "";
    while (true) {
      hash = stringToSHA256(
        previousBlockHash + blockNumber + timestamp + merkleRoot + nonce
      );
      if (hash.startsWith(prefix)) {
        break;
      } else {
        nonce++;
      }
    }
    return { hash, nonce };
  }

  // Traversal of singly linked list.
  printBlockchain() {
    let current: Block | null = this.head;
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

  validateBlockchain(): boolean {
    let current: Block | null = this.head;

    while (current && current.prevBlock) {
      const computedHash = stringToSHA256(
        current.header.previousBlockHash +
          current.header.blockNumber +
          current.header.timestamp +
          current.header.merkleRoot +
          current.header.nonce
      );

      if (computedHash !== current.header.blockHash) {
        console.error(
          `Block ${current.header.blockNumber} has an invalid hash`
        );
        return false;
      }

      if (
        current.header.previousBlockHash !== current.prevBlock.header.blockHash
      ) {
        console.error(
          `Block ${current.header.blockNumber} has an incorrect previous block reference`
        );
        return false;
      }

      current = current.prevBlock;
    }

    console.log("Blockchain is valid");
    return true;
  }
}
