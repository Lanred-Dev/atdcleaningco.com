<script lang="ts">
    import {
        setHorizontalSnappingListContext,
        getHorizontalSnappingListContext,
    } from "./HorizontalSnappingListContext.ts";
    import { type Snippet, onMount } from "svelte";

    let {
        children,
        Controls,
        cycleDuration = 5000,
    }: {
        children: Snippet;
        Controls?: Snippet;
        cycleDuration?: number;
    } = $props();

    let cycleInterval: ReturnType<typeof setInterval> | undefined;
    let items = $state<HTMLElement[]>([]);
    let HorizontalSnappingListContext = $state<ReturnType<typeof getHorizontalSnappingListContext>>(
        {
            registerItem: (item: HTMLElement) => {
                items.push(item);
                return items.length - 1;
            },
            previousItem,
            nextItem,
            stopAutoScroll,
            startAutoScroll,
            currentItemIndex: 0,
            get itemCount() {
                return items.length;
            },
        }
    );

    setHorizontalSnappingListContext(HorizontalSnappingListContext);

    function incrementIndex(direction: number) {
        HorizontalSnappingListContext.currentItemIndex =
            (HorizontalSnappingListContext.currentItemIndex + direction + items.length) %
            items.length;

        startAutoScroll();
    }

    function nextItem() {
        incrementIndex(1);
    }

    function previousItem() {
        incrementIndex(-1);
    }

    function startAutoScroll() {
        stopAutoScroll();
        cycleInterval = setInterval(nextItem, cycleDuration);
    }

    function stopAutoScroll() {
        if (cycleInterval === undefined) return;

        clearInterval(cycleInterval);
        cycleInterval = undefined;
    }

    onMount(() => {
        startAutoScroll();

        return () => {
            stopAutoScroll();
        };
    });
</script>

<svelte:document
    onvisibilitychange={() => {
        if (document.hidden) stopAutoScroll();
        else startAutoScroll();
    }}
/>

<div class="relative w-full overflow-x-clip overflow-y-visible">
    {@render Controls?.()}

    <ul class="relative h-50 w-full">
        {@render children()}
    </ul>
</div>
