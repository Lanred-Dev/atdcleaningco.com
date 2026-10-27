<script lang="ts">
    import QuickActions from "./QuickActions.svelte";
    import Analytics from "./Analytics.svelte";
    import type { PageServerData } from "./$types";

    let { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
    <title>Admin Home | Attention to Detail Cleaning Company</title>
</svelte:head>

<Analytics analytics={data.analytics} sources={data.sources} />
<QuickActions />

<style>
    @reference "../../../layout.css";

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
