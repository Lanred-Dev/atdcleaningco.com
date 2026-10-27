import { db } from "#lib/server/db/index.ts";
import { contactInquiriesSchema, type ContactInquiry } from "#lib/server/db/schema.ts";
import type { PageServerLoad } from "./$types";
import { desc } from "drizzle-orm";

export const load: PageServerLoad = async () => {
    const inquiries: ContactInquiry[] = await db
        .select()
        .from(contactInquiriesSchema)
        .orderBy(desc(contactInquiriesSchema.createdAt));

    return {
        inquiries,
    };
};