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

<div class="flex flex-col gap-y-12">
    <Analytics trafficSources={data.trafficSources} marketingCampaigns={data.marketingCampaigns} />

    <ActionsList actions={CUSTOMER_SUPPORT_ACTIONS}>
        {#snippet Title()}
            Customer Support
        {/snippet}

        {#snippet Subtitle()}
            Manage inquiries
        {/snippet}
    </ActionsList>

    <ActionsList actions={ANALYTICS_ACTIONS}>
        {#snippet Title()}
            Analytics
        {/snippet}

        {#snippet Subtitle()}
            Manage marketing metrics and website traffic
        {/snippet}
    </ActionsList>

    <ActionsList actions={COMPANY_INFO_ACTIONS}>
        {#snippet Title()}
            Company Details
        {/snippet}

        {#snippet Subtitle()}
            Update business details such as phone #, email, and service areas
        {/snippet}
    </ActionsList>

    <ActionsList actions={STAFF_ACTIONS}>
        {#snippet Title()}
            Staff
        {/snippet}

        {#snippet Subtitle()}
            Manage staff profiles
        {/snippet}
    </ActionsList>
</div>

<style>
    @reference "../../../../layout.css";

    :global(section) {
        @apply relative w-full;

        :global(.section-title) {
            @apply mb-4 w-full gap-y-3;

            & h2.title {
                @apply max-w-2xl text-3xl font-bold text-title sm:text-4xl;
            }

            & p.subtitle {
                @apply max-w-lg text-base md:text-lg;
            }
        }
    }
</style>
