<script lang="ts">
    import { onMount } from "svelte";
    import { quartInOut } from "svelte/easing";
    import type { ClassValue } from "svelte/elements";
    import { fly } from "svelte/transition";

    let {
        words,
        currentIndex = $bindable(0),
        cycleInterval = 3000,
        class: className,
    }: {
        words: string[];
        currentIndex?: number;
        cycleInterval?: number;
        class?: ClassValue;
    } = $props();

    // Whenever the page is first loaded this prevents the word wrapper from animating to the width of the first word.
    let isInitialLabelHidden = $state.raw<boolean>(false);
    let currentLabelWidth = $state.raw<number>(0);

    function nextWord() {
        if (!isInitialLabelHidden) isInitialLabelHidden = true;

        currentIndex = (currentIndex + 1) % words.length;
    }

    onMount(() => {
        currentIndex = Math.floor(Math.random() * words.length);

        const nextWordInterval = setInterval(nextWord, cycleInterval);
        return () => clearInterval(nextWordInterval);
    });
</script>

<span
    class={[
        "relative inline-block h-full text-nowrap transition-[width] duration-500 ease-in-out",
        className,
    ]}
    style:width={isInitialLabelHidden && currentLabelWidth > 0 ? `${currentLabelWidth}px` : ""}
>
    <!-- This span ensures that the parent maintains the correct line height -->
    <span class="pointer-events-none invisible">
        {!isInitialLabelHidden ? words[currentIndex] : "."}
    </span>

    {#each words as word, index (word)}
        {#if index === currentIndex}
            <span
                class="y-center absolute left-0"
                bind:clientWidth={currentLabelWidth}
                in:fly={{ y: 40, duration: 500, delay: 100, easing: quartInOut }}
                out:fly={{ y: -40, duration: 500, easing: quartInOut }}>{word}</span
            >
        {/if}
    {/each}
</span>
