import { SHA256_ENCRYPTION_TOKEN } from "$app/env/private";
import { createHmac } from "node:crypto";
import { hash, verify } from "argon2";

export function encryptSHA256(unencrypted: string): string {
    return createHmac("sha256", SHA256_ENCRYPTION_TOKEN).update(unencrypted).digest("hex");
}

export async function encrpytArgon(unencrypted: string): Promise<string> {
    return await hash(unencrypted);
}

export async function compareArgon(encrypted: string, unencrypted: string): Promise<boolean> {
    return await verify(encrypted, unencrypted)
}