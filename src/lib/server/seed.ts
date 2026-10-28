import { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } from "$app/env/private";
import { auth } from "#lib/server/auth.ts";
import { user } from "#lib/server/db/auth.schema.ts";
import { eq } from "drizzle-orm";
import { companyInfoSchema } from "#lib/server/db/schema.ts";
import { db } from "#lib/server/db/index.ts";
import { marketingCampaignsSchema } from "#lib/server/db/schema.ts";

export function seedCompanyInfo() {
    try {
        db.insert(companyInfoSchema).values({}).onConflictDoNothing().run();
    } catch {
        console.error("Failed to insert default company info. It may already exist.");
    }
}

export function seedAdminUser() {
    const doesAdminUserExist = db.select().from(user).where(eq(user.email, ADMIN_EMAIL)).get();

    if (doesAdminUserExist) return;

    auth.api.createUser({
        body: {
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
            name: ADMIN_NAME,
            role: "user",
        },
    });
}

export function seedMarketingCampaigns() {
    try {
        db.insert(marketingCampaignsSchema)
            .values({
                name: "web",
                id: "web",
                isCore: true,
            })
            .onConflictDoNothing()
            .run();
    } catch {
        console.error("Failed to insert default company info. It may already exist.");
    }
}
