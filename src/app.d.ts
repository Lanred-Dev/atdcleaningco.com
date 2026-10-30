import type { Session, User } from "#lib/server/db/auth.schema.ts";

declare global {
    namespace App {
        interface Locals {
            session?: Session;
            user?: User;
        }
    }
}

export {};
