import { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } from "$app/env/private";
import { companyInfoSchema } from "#lib/server/db/schema.ts";
import { db } from "#lib/server/db/index.ts";
import { marketingCampaignsSchema } from "#lib/server/db/schema.ts";
import { getUserByEmail, createUser } from "#lib/server/auth/users.ts";
import { createAccount } from "#lib/server/auth/accounts.ts";

export function seedCompanyInfo() {
    console.log("Seeding company info... (if needed)");

    try {
        db.insert(companyInfoSchema).values({}).onConflictDoNothing().run();
    } catch {
        console.error("Failed to insert default company info. It may already exist.");
    }
}

export async function seedAdminUser() {
    const doesAdminUserExist = getUserByEmail(ADMIN_EMAIL) !== undefined;

    if (doesAdminUserExist) return;

    console.info("Seeding admin user...");

    const user = createUser({
        email: ADMIN_EMAIL,
        name: ADMIN_NAME,
        role: "admin",
    });

    await createAccount({
        provider: "credential",
        password: ADMIN_PASSWORD,
        user: user.id,
    });
}

export function seedMarketingCampaigns() {
    console.log("Seeding marketing campaigns... (if needed)");

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
        console.error("Failed to insert default marketing campaigns. It may already exist.");
    }
}
