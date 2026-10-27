import type { PageServerLoad, Actions } from "./$types";
import { db } from "#lib/server/db/index.ts";
import {
    contactInquiriesSchema,
    companyInfoSchema,
    type CompanyInfo,
} from "#lib/server/db/schema.ts";
import { validate as validateEmail } from "email-validator";
import { fail } from "@sveltejs/kit";
import { eq, sql } from "drizzle-orm";
import parsePhoneNumber from "libphonenumber-js";
import { resend, emailRenderer } from "#lib/server/resend.ts";
import { user as userSchema } from "#lib/server/db/auth.schema.ts";
import { INQUIRIES_EMAIL_SENDER } from "$app/env/private";
import InquiryThankYou from "#lib/server/emails/customer/InquiryThankYou.svelte";
import NewInquiry from "#lib/server/emails/admin/NewInquiry.svelte";

export const load: PageServerLoad = async ({ url }) => {
    const companyInfo: CompanyInfo = (
        await db.select().from(companyInfoSchema).where(eq(companyInfoSchema.id, 1))
    )[0];
    const mode = url.searchParams.get("mode") === "quote" ? "quote" : "contact";

    return {
        companyInfo,
        mode,
    };
};

export const actions: Actions = {
    submitInquiry: async (event) => {
        const formData = await event.request.formData();
        const firstName = formData.get("firstName")?.toString().trim();
        const lastName = formData.get("lastName")?.toString().trim();
        let email = formData.get("email")?.toString();
        let phone = formData.get("phone")?.toString();
        const message = formData.get("message")?.toString() ?? "";
        const service = formData.get("service")?.toString() ?? "";
        const frequency = formData.get("frequency")?.toString() ?? "";
        const location = formData.get("location")?.toString() ?? "";

        if (!firstName || !lastName || !email || !phone || !message)
            return fail(400, "Missing required fields");

        if (!validateEmail(email)) return fail(400, { error: "Invalid email address" });
        else email = email.toLowerCase().trim();

        const parsedPhone = parsePhoneNumber(phone, "US");

        if (!parsedPhone?.isValid()) return fail(400, { error: "Invalid phone number" });
        else phone = parsedPhone.formatNational();

        const fullName = `${firstName} ${lastName}`;

        const contactInquiry = await db.insert(contactInquiriesSchema).values({
            name: fullName,
            email,
            phone,
            message,
            service,
            frequency,
            location,
            createdAt: new Date(),
        });

        await resend.emails.send({
            from: INQUIRIES_EMAIL_SENDER,
            to: email,
            subject: `Thank you for you contacting us [Ref: ${contactInquiry.lastInsertRowid}]`,
            html: await emailRenderer(InquiryThankYou, { props: { name: firstName } }),
        });

        await resend.emails.send({
            from: INQUIRIES_EMAIL_SENDER,
            to: db
                .select({ email: userSchema.email })
                .from(userSchema)
                .where(sql`json_extract(${userSchema.notificationPreferences}, '$.inquiries') = 1`)
                .all()
                .map((row) => row.email),
            subject: "New Inquiry Received",
            html: await emailRenderer(NewInquiry, { props: { name: fullName } }),
        });
    },
};
