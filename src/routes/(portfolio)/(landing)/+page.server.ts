import type { PageServerLoad } from "./$types";
import { db } from "#lib/server/db/index.ts";
import { desc, eq } from "drizzle-orm";
import { companyInfoSchema, type CompanyInfo, testimonialsSchema } from "#lib/server/db/schema.ts";

export const load: PageServerLoad = async () => {
    const testimonials = await db
        .select()
        .from(testimonialsSchema)
        .orderBy(desc(testimonialsSchema.createdAt));
    const companyInfo: CompanyInfo = (
        await db.select().from(companyInfoSchema).where(eq(companyInfoSchema.id, 1))
    )[0];

    return {
        testimonials,
        companyInfo,
    };
};
