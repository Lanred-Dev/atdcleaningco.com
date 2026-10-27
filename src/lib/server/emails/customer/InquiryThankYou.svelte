<script lang="ts">
    import {
        Html,
        Head,
        Body,
        Preview,
        Container,
        Section,
        Text,
    } from "@better-svelte-email/components";

    let {
        name,
    }: {
        name: string;
    } = $props();
</script>

<Html>
    <Head>
        <style>
            @font-face {
                font-family: "Outfit";
                src: url("https://atdcleaningco.com/fonts/Outfit.ttf") format("truetype");
                font-weight: 400;
                font-style: normal;
                mso-font-alt: "Arial";
            }
            * {
                font-family:
                    "Outfit",
                    -apple-system,
                    BlinkMacSystemFont,
                    "Segoe UI",
                    Roboto,
                    Helvetica,
                    Arial,
                    sans-serif;
            }
        </style>
    </Head>

    <Body class="m-0 bg-page py-8 text-primary">
        <Preview preview="Thank you for reaching out to Attention to Detail Cleaning Co." />

        <Container class="mx-auto max-w-lg overflow-hidden rounded-container bg-dark p-8 shadow-sm">
            <Section class="mb-6">
                <Text class="m-0 text-xs font-semibold tracking-widest text-attention uppercase">
                    Attention to Detail Cleaning Co.
                </Text>
            </Section>

            <Section>
                <Text class="m-0 text-2xl leading-tight font-bold text-title sm:text-3xl">
                    Dear {name},
                </Text>

                <Text class="mt-4 text-base leading-relaxed">
                    Thank you for your inquiry. We will get back to you as soon as possible.
                </Text>
            </Section>

            <Section class="mt-6">
                <Text class="m-0 text-base leading-relaxed">Best regards,</Text>
                <Text class="m-0 mt-1 font-semibold text-title">
                    The Attention to Detail Cleaning Team
                </Text>
            </Section>
        </Container>

        <Section class="mx-auto max-w-lg px-6 py-6 text-center">
            <Text class="mx-auto max-w-sm text-xs leading-relaxed text-muted">
                This is an automated message. Please do not reply directly to this email. If you
                have any further questions, please get in touch with us through our website, email,
                or by phone.
            </Text>

            <Text class="mt-3 text-[11px] text-muted">
                © {new Date().getFullYear()} Attention to Detail Cleaning Co. All rights reserved.
            </Text>
        </Section>
    </Body>
</Html>
