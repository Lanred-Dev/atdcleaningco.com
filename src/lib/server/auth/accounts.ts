import {
    accountsSchema,
    type Account,
    type NewAccount,
    type User,
} from "#lib/server/db/auth.schema.ts";
import { db } from "#lib/server/db/index.ts";
import { and, eq } from "drizzle-orm";
import { compareArgon, encrpytArgon } from "./encryption";

async function encryptPassword(
    password: Account["password"] | NewAccount["password"]
): Promise<Account["password"]> {
    if (typeof password !== "string" || password.length <= 0) throw Error("Invalid password");

    return await encrpytArgon(password);
}

export async function createAccount(data: NewAccount): Promise<NewAccount> {
    if (data.provider === "credential") data.password = await encryptPassword(data.password);

    return db.insert(accountsSchema).values(data).returning().get();
}

export async function changeAccountPassword(user: User["id"], password: Account["password"]) {
    const account = db
        .select()
        .from(accountsSchema)
        .where(and(eq(accountsSchema.user, user), eq(accountsSchema.provider, "credential")))
        .get();

    if (!account) throw Error(`No account of type 'credential' for ${user}`);

    db.update(accountsSchema)
        .set({ password: await encryptPassword(password) })
        .where(and(eq(accountsSchema.user, user), eq(accountsSchema.provider, "credential")))
        .run();
}

export async function doPasswordsMatch(
    user: User["id"],
    password: Account["password"]
): Promise<boolean> {
    const account = db
        .select({ password: accountsSchema.password })
        .from(accountsSchema)
        .where(and(eq(accountsSchema.user, user), eq(accountsSchema.provider, "credential")))
        .get();

    if (!account) throw Error(`No account of type 'credential' for ${user}`);

    return await compareArgon(account.password!, password!);
}

export function deleteAccount(id: Account["id"]) {
    db.delete(accountsSchema).where(eq(accountsSchema.id, id)).run();
}
