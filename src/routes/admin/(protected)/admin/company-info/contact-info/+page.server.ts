import { db } from "#lib/server/db/index.ts";
import type { PageServerLoad, Actions } from "./$types";
import { eq } from "drizzle-orm";
import { fail } from "@sveltejs/kit";
import { companyInfoSchema } from "#lib/server/db/schema.ts";
import { validate as validateEmail } from "email-validator";
import parsePhoneNumber from "libphonenumber-js";

export const load: PageServerLoad = () => {
    const companyInfo = db
        .select()
        .from(companyInfoSchema)
        .where(eq(companyInfoSchema.id, 1))
        .get()!;

    return {
        companyInfo,
    };
};

export const actions: Actions = {
    update: async ({ request }) => {
        const data = await request.formData();
        let residentialPhone = data.get("residentialPhone")?.toString();
        let commercialPhone = data.get("commercialPhone")?.toString();
        let email = data.get("email")?.toString();

        if (!residentialPhone || !commercialPhone || !email)
            return fail(400, { error: "Missing required fields" });

        if (!validateEmail(email)) return fail(400, { error: "Invalid email address" });
        else email = email.toLowerCase().trim();

        const parsedResidentialPhone = parsePhoneNumber(residentialPhone, "US");

        if (!parsedResidentialPhone?.isValid())
            return fail(400, { error: "Invalid residential phone number" });
        else residentialPhone = parsedResidentialPhone.formatNational();

        const parsedCommercialPhone = parsePhoneNumber(commercialPhone, "US");

        if (!parsedCommercialPhone?.isValid())
            return fail(400, { error: "Invalid commercial phone number" });
        else commercialPhone = parsedCommercialPhone.formatNational();

        db.update(companyInfoSchema)
            .set({
                residentialPhone,
                commercialPhone,
                email,
            })
            .where(eq(companyInfoSchema.id, 1))
            .run();

        return { success: true };
    },
};
