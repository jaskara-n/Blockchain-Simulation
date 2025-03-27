"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const utils_1 = require("../utilities/utils");
class Transaction {
    constructor(msgSender, msgReceiver, msgValue) {
        this.msgSender = msgSender;
        this.msgReceiver = msgReceiver;
        this.msgValue = msgValue;
        this.txHash = this.computeTxHash(msgSender, msgReceiver, msgValue);
    }
    // Computes the hash of a transaction.
    computeTxHash(sender, receiver, amount) {
        return (0, utils_1.stringToSHA256)(sender + receiver + amount);
    }
}
exports.Transaction = Transaction;
