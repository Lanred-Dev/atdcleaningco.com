<script lang="ts">
    import {
        setHorizontalSnappingListContext,
        getHorizontalSnappingListContext,
    } from "./HorizontalSnappingListContext.ts";
    import { type Snippet, onMount } from "svelte";

    let {
        children,
        Controls,
        autoScrollDelay = 5000,
    }: {
        children: Snippet;
        Controls?: Snippet;
        autoScrollDelay?: number;
    } = $props();

    let autoScrollInterval: ReturnType<typeof setTimeout> | undefined;
    let items = $state<HTMLElement[]>([]);
    let HorizontalSnappingListContext = $state<ReturnType<typeof getHorizontalSnappingListContext>>(
        {
            registerItem: (item: HTMLElement) => {
                items.push(item);
                return items.length - 1;
            },
            previousItem: () => {
                previousItem();
                startAutoScroll();
            },
            nextItem: () => {
                nextItem();
                startAutoScroll();
            },
            pauseAutoScroll: stopAutoScroll,
            resumeAutoScroll: startAutoScroll,
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
    }

    function nextItem() {
        incrementIndex(1);
    }

    function previousItem() {
        incrementIndex(-1);
    }

    function startAutoScroll() {
        stopAutoScroll();

        autoScrollInterval = setInterval(() => {
            if (items.length === 0) return;

            nextItem();
        }, autoScrollDelay);
    }

    function stopAutoScroll() {
        if (autoScrollInterval === undefined) return;

        clearInterval(autoScrollInterval);
        autoScrollInterval = undefined;
    }

    onMount(() => {
        startAutoScroll();

        return () => {
            stopAutoScroll();
        };
    });
</script>

<div class="relative w-full overflow-x-clip overflow-y-visible">
    {@render Controls?.()}

    <ul class="relative h-50 w-full">
        {@render children()}
    </ul>
</div>
