<script lang="ts">
    import ActionsList from "./ActionsList.svelte";
    import Analytics from "./Analytics.svelte";
    import type { PageServerData } from "./$types";
    import type { ComponentProps } from "svelte";

    let { data }: { data: PageServerData } = $props();

    type Actions = ComponentProps<typeof ActionsList>["actions"];

    const CUSTOMER_SUPPORT_ACTIONS: Actions = [
        {
            title: "View Inquiries",
            description: "View contact inquiries.",
            href: "/admin/(protected)/admin/inquiries",
        },
    ];
    const ANALYTICS_ACTIONS: Actions = [
        {
            title: "Marketing Campaigns",
            description: "Manage marketing campaigns.",
            href: "/admin/(protected)/admin/analytics/campaigns",
        },
    ];
    const COMPANY_INFO_ACTIONS: Actions = [
        {
            title: "Edit Testimonials",
            description: "Edit the testimonials that are displayed on the landing page.",
            href: "/admin/(protected)/admin/company-info/testimonials",
        },
        {
            title: "Edit Contact Info",
            description: "Edit the contact information that is displayed on the website.",
            href: "/admin/(protected)/admin/company-info/contact-info",
        },
        {
            title: "Edit Service Areas",
            description: "Edit the service areas.",
            href: "/admin/(protected)/admin/company-info/service-areas",
        },
    ];
    const STAFF_ACTIONS: Actions = [
        {
            title: "Edit Staff",
            description: "Edit staff accounts.",
            href: "/admin/(protected)/admin/staff/accounts",
        },
    ];
</script>

<svelte:head>
    <title>Admin Home | Attention to Detail Cleaning Company</title>
</svelte:head>

<div class="flex flex-col gap-y-8">
    <Analytics trafficSources={data.trafficSources} marketingCampaigns={data.marketingCampaigns} />

    <ActionsList actions={CUSTOMER_SUPPORT_ACTIONS}>
        {#snippet Title()}
            Customer Support
        {/snippet}

        {#snippet Subtitle()}
            Some people def need help
        {/snippet}
    </ActionsList>

    <ActionsList actions={ANALYTICS_ACTIONS}>
        {#snippet Title()}
            Analytics
        {/snippet}

        {#snippet Subtitle()}
            Relates to marketing and website traffic
        {/snippet}
    </ActionsList>

    <ActionsList actions={COMPANY_INFO_ACTIONS}>
        {#snippet Title()}
            Company Info
        {/snippet}

        {#snippet Subtitle()}
            For Company Info
        {/snippet}
    </ActionsList>

    <ActionsList actions={STAFF_ACTIONS}>
        {#snippet Title()}
            Staff
        {/snippet}

        {#snippet Subtitle()}
            For staff
        {/snippet}
    </ActionsList>
</div>

<style>
    @reference "../../../../layout.css";

    :global(section) {
        @apply relative w-full py-20 md:py-2;

        :global(.section-title) {
            @apply mb-6 w-full gap-y-3;

            & h2.title {
                @apply max-w-2xl text-3xl font-bold text-title sm:text-4xl;
            }

            & p.subtitle {
                @apply max-w-lg text-base md:text-lg;
            }
        }
    }
</style>
