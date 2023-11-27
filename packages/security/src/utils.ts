import * as argon2 from "argon2";

export function hash(toHash: string) {
  return argon2.hash(toHash);
}

export function compareHash(hash: string, toCompare: string) {
  return argon2.verify(hash, toCompare);
}
