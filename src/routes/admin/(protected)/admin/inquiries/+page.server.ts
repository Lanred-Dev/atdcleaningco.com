import { db } from "#lib/server/db/index.ts";
import { contactInquiriesSchema } from "#lib/server/db/schema.ts";
import type { PageServerLoad } from "./$types";
import { asc } from "drizzle-orm";

export const load: PageServerLoad = () => {
    const inquiries = db
        .select()
        .from(contactInquiriesSchema)
        .orderBy(asc(contactInquiriesSchema.createdAt))
        .all();

    return {
        inquiries,
    };
};
