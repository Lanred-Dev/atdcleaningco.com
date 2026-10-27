<script lang="ts">
    import {
        HorizontalSnappingList,
        HorizontalSnappingListItem,
        HorizontalSnappingListControls,
    } from "#lib/components/HorizontalSnappingList/index.ts";
    import type { PageServerData } from "./$types";

    let { testimonials }: { testimonials: PageServerData["testimonials"] } = $props();
</script>

<section class="bg-dark">
    <div class="section-title">
        <h2 class="title">Dont just take our word for it, see what our clients have to say</h2>

        <p class="subtitle">
            We take pride in our work and our clients' satisfaction is our top priority. Here are
            some testimonials from our happy customers.
        </p>
    </div>

    <HorizontalSnappingList>
        {#snippet Controls()}
            <HorizontalSnappingListControls class="page-x-padding" />
        {/snippet}

        {#each testimonials as testimonial (testimonial.id)}
            <HorizontalSnappingListItem>
                <div class="container-primary flex h-full w-full flex-col gap-2 p-8">
                    <div class="w-full grow">
                        <p>{testimonial.text}</p>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="space-y-0.5">
                            <p class="text-xl font-semibold text-title">
                                {testimonial.name}
                            </p>
                            <p class="text-muted">{testimonial.location}</p>
                        </div>
                    </div>
                </div>
            </HorizontalSnappingListItem>
        {/each}
    </HorizontalSnappingList>
</section>
