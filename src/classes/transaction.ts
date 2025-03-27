import { stringToSHA256 } from "../utilities/utils";
export class Transaction {
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
