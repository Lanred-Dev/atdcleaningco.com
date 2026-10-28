<script lang="ts">
    import Card from "#lib/components/Card.svelte";
    import type { RouteId } from "$app/types";

    const QUICK_ACTIONS: { title: string; description: string; href: RouteId }[] = [
        {
            title: "View Inquiries",
            description: "View contact inquiries.",
            href: "/admin/(protected)/inquiries",
        },
        {
            title: "Marketing Campaigns",
            description: "Manage marketing campaigns.",
            href: "/admin/(protected)/edit/analytics/campaigns",
        },
        {
            title: "Edit Testimonials",
            description: "Edit the testimonials that are displayed on the landing page.",
            href: "/admin/(protected)/edit/testimonials",
        },
        {
            title: "Edit Contact Info",
            description: "Edit the contact information that is displayed on the website.",
            href: "/admin/(protected)/edit/contact-info",
        },
        {
            title: "Edit Service Areas",
            description: "Edit the service areas.",
            href: "/admin/(protected)/edit/service-areas",
        },
    ];
</script>

<section>
    <div class="section-title">
        <h2 class="title">Quick Actions</h2>
        <p class="subtitle">Quick links to common admin actions.</p>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {#each QUICK_ACTIONS as action (action.href)}
            <Card href={action.href}>
                {#snippet Title()}
                    {action.title}
                {/snippet}

                {#snippet Description()}
                    {action.description}
                {/snippet}
            </Card>
        {/each}
    </div>
</section>
