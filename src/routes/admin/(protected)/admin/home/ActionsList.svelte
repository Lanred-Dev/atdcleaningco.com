<script lang="ts">
    import Card from "#lib/components/Card.svelte";
    import type { RouteId } from "$app/types";
    import type { Snippet } from "svelte";

    let {
        Title,
        Subtitle,
        actions,
    }: {
        Title: Snippet;
        Subtitle: Snippet;
        actions: { title: string; description: string; href: RouteId }[];
    } = $props();
</script>

<section>
    <div class="section-title">
        <h2 class="title">
            {@render Title()}
        </h2>

        <p class="subtitle">
            {@render Subtitle()}
        </p>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {#each actions as action (action.href)}
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
