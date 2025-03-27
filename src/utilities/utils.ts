import crypto from "crypto";

// Utility function to convert a string to SHA256 hash.
export function stringToSHA256(input: string): string {
  const hash = crypto.createHash("sha256");
  hash.update(input);
  return hash.digest("hex");
}
