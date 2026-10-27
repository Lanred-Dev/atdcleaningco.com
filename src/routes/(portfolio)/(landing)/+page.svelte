<script lang="ts">
    import Hero from "./Hero.svelte";
    import Services from "./Services.svelte";
    import Testimonials from "./Testimonials.svelte";
    import ServiceAreas from "./ServiceAreas.svelte";
    import CallToAction from "./CallToAction.svelte";
    import type { PageServerData } from "./$types";

    let { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
    <title>Attention to Detail Cleaning Company | Central & North Alabama</title>
</svelte:head>

<Hero />

<div class="invisible" id="learn-more-marker"></div>

<Services />
<Testimonials testimonials={data.testimonials} />
<ServiceAreas companyInfo={data.companyInfo} />
<CallToAction />

<style>
    @reference "../../layout.css";

    :global(section) {
        @apply relative w-full py-20 md:py-28;

        :global(.section-title) {
            @apply mb-12 flex w-full flex-col items-center gap-y-3 page-x-padding text-center;

            & h2.title {
                @apply max-w-2xl text-3xl font-bold text-title sm:text-4xl;
            }

            & p.subtitle {
                @apply max-w-lg text-base md:text-lg;
            }
        }
    }
</style>
