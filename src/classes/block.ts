import { BlockHeader } from "../interfaces/blockHeader";
import { BlockMerkleTree } from "./blockMerkleTree";
export class Block {
  header: BlockHeader;
  merkleTree: BlockMerkleTree;
  prevBlock: Block | null; // Just to make traversal of linked list easier, we add a reference here directly to the prev block.
  // This is not a good practice but it is just for the sake of the assignment.
  constructor(
    header: BlockHeader,
    merkleTree: BlockMerkleTree,
    prevBlock: Block | null
  ) {
    this.header = header;
    this.merkleTree = merkleTree;
    this.prevBlock = prevBlock;
  }
}
