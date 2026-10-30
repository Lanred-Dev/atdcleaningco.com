import type { Account, Session, User } from "#lib/server/db/auth.schema.ts";
import type { RequestEvent } from "@sveltejs/kit";
import { doPasswordsMatch } from "./accounts";
import { createSession, deleteSession } from "./session";
import { getUserByEmail } from "./users";

export async function signInWithEmail(
    email: User["email"],
    password: Account["password"],
    cookies: RequestEvent["cookies"]
) {
    const user = getUserByEmail(email);

    if (!user) throw Error(`${email} is not associated with any account`);
    else if (!(await doPasswordsMatch(user.id, password))) throw Error("Password is incorrect");

    createSession(user.id, cookies);
}

export function signOut(id: Session["id"], cookies: RequestEvent["cookies"]) {
    deleteSession(id, cookies);
}
