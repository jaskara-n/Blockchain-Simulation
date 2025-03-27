"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToSHA256 = stringToSHA256;
const crypto_1 = __importDefault(require("crypto"));
// Utility function to convert a string to SHA256 hash.
function stringToSHA256(input) {
    const hash = crypto_1.default.createHash("sha256");
    hash.update(input);
    return hash.digest("hex");
}
