import { db } from "#lib/server/db/index.ts";
import type { PageServerLoad, Actions } from "./$types";
import { eq } from "drizzle-orm";
import { fail } from "@sveltejs/kit";
import { companyInfoSchema } from "#lib/server/db/schema.ts";
import generateZipCodeGeoJson from "#lib/server/utils/map/generateZipCodeGeoJson.ts";

export const load: PageServerLoad = () => {
    const companyInfo = db.select().from(companyInfoSchema).where(eq(companyInfoSchema.id, 1)).get()!

    return {
        companyInfo,
    };
};

export const actions: Actions = {
    update: async ({ request }) => {
        const data = await request.formData();
        const serviceAreas = new Set(
            data.getAll("serviceAreas").map((zip) => (zip as string).trim())
        );

        if (!serviceAreas || serviceAreas.size === 0)
            return fail(400, { error: "Missing required fields" });

        let geoJson: ReturnType<typeof generateZipCodeGeoJson>;

        try {
            geoJson = generateZipCodeGeoJson(serviceAreas);
        } catch (error) {
            return fail(400, { error });
        }

        db.update(companyInfoSchema)
            .set({
                serviceAreas: Array.from(serviceAreas),
                serviceAreasGeoJson: geoJson,
            })
            .where(eq(companyInfoSchema.id, 1))
            .run();

        return { success: true };
    },
};
