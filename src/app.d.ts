import type { auth } from "#lib/server/auth.ts";

declare global {
    namespace App {
        interface Locals {
            user: typeof auth.$Infer.Session.user | null;
            session: typeof auth.$Infer.Session.session | null;
        }
    }
}

export {};
