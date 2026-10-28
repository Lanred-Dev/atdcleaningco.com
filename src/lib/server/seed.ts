import { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME } from "$app/env/private";
import { auth } from "#lib/server/auth.ts";
import { user as usersSchema } from "#lib/server/db/auth.schema.ts";
import { eq } from "drizzle-orm";
import { companyInfoSchema } from "#lib/server/db/schema.ts";
import { db } from "#lib/server/db/index.ts";
import { marketingCampaignsSchema } from "#lib/server/db/schema.ts";

export function seedCompanyInfo() {
    console.log("Seeding company info... (if needed)");

    try {
        db.insert(companyInfoSchema).values({}).onConflictDoNothing().run();
    } catch {
        console.error("Failed to insert default company info. It may already exist.");
    }
}

export function seedAdminUser() {
    console.log("Seeding admin user... (if needed)");

    const doesAdminUserExist = db
        .select()
        .from(usersSchema)
        .where(eq(usersSchema.email, ADMIN_EMAIL))
        .get();

    if (doesAdminUserExist) return;

    auth.api.createUser({
        body: {
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
            name: ADMIN_NAME,
            role: "admin",
        },
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
