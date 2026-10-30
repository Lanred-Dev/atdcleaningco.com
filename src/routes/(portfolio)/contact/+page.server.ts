import type { PageServerLoad, Actions } from "./$types";
import { db } from "#lib/server/db/index.ts";
import { contactInquiriesSchema, companyInfoSchema, usersSchema } from "#lib/server/db/schema.ts";
import { validate as validateEmail } from "email-validator";
import { fail } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import parsePhoneNumber from "libphonenumber-js";
import { resend, emailRenderer } from "#lib/server/resend.ts";
import { INQUIRIES_EMAIL_SENDER } from "$app/env/private";
import InquiryThankYou from "#lib/server/emails/customer/InquiryThankYou.svelte";
import NewInquiry from "#lib/server/emails/admin/NewInquiry.svelte";

export const load: PageServerLoad = ({ url }) => {
    const companyInfo = db
        .select()
        .from(companyInfoSchema)
        .where(eq(companyInfoSchema.id, 1))
        .get()!;
    const mode = url.searchParams.get("mode") === "quote" ? "quote" : "contact";

    return {
        companyInfo,
        mode,
    };
};

export const actions: Actions = {
    submit: async (event) => {
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

        const inquiry = db
            .insert(contactInquiriesSchema)
            .values({
                name: fullName,
                email,
                phone,
                message,
                service,
                frequency,
                location,
            })
            .returning()
            .get();

        await resend.emails.send({
            from: INQUIRIES_EMAIL_SENDER,
            to: email,
            subject: `Thank you for you contacting us [Ref: ${inquiry.id}]`,
            html: await emailRenderer(InquiryThankYou, { props: { name: firstName } }),
        });

        const renderedNewInquiryEmail = await emailRenderer(NewInquiry, {
            props: { name: fullName },
        });
        const adminRecipients = db
            .select({ email: usersSchema.email })
            .from(usersSchema)
            .where(eq(usersSchema.inquiryNotifcationPreference, true))
            .all();

        await resend.batch.send(
            adminRecipients.map((recipient) => ({
                from: INQUIRIES_EMAIL_SENDER,
                to: recipient.email,
                subject: `New Inquiry Received [Ref: ${inquiry.id}]`,
                html: renderedNewInquiryEmail,
            }))
        );
    },
};
