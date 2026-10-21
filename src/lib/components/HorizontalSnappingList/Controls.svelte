<script lang="ts">
    import Icon from "#lib/components/Icon.svelte";
    import { getHorizontalSnappingListContext } from "./HorizontalSnappingListContext.ts";
    import type { ClassValue } from "svelte/elements";

    let {
        class: className,
    }: {
        class?: ClassValue;
    } = $props();

    const HorizontalSnappingListContext = getHorizontalSnappingListContext();
</script>

<div class={["y-center x-center z-2 flex w-full items-center justify-between", className]}>
    <button
        class="button-primary icon"
        onclick={HorizontalSnappingListContext.previousItem}
        aria-label="Previous Item"
    >
        <Icon icon="Arrows/Left" />
    </button>

    <button
        class="button-primary icon"
        onclick={HorizontalSnappingListContext.nextItem}
        aria-label="Next Item"
    >
        <Icon icon="Arrows/Right" />
    </button>
</div>
