<script lang="ts">
    import { onMount } from "svelte";
    import { cubicOut } from "svelte/easing";
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

    let isInitialLabelHidden: boolean = $state.raw(false);
    let labelWidths: number[] = $state([]);

    function nextWord() {
        if (!isInitialLabelHidden) isInitialLabelHidden = true;

        currentIndex = (currentIndex + 1) % words.length;
    }

    onMount(() => {
        currentIndex = Math.floor(Math.random() * words.length);
        labelWidths = Array(words.length).fill(0);

        const nextWordInterval = setInterval(nextWord, cycleInterval);
        return () => clearInterval(nextWordInterval);
    });
</script>

<span
    class={[
        "relative inline-block h-full text-nowrap transition-[width] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]",
        className,
    ]}
    style:width={isInitialLabelHidden && labelWidths[currentIndex] > 0
        ? `${labelWidths[currentIndex]}px`
        : ""}
>
    {#if !isInitialLabelHidden}
        <span bind:clientWidth={labelWidths[currentIndex]}>{words[currentIndex]}</span>
    {:else}
        <!-- This span ensures that the parent maintains the correct line height -->
        <span class="pointer-events-none invisible">.</span>
    {/if}

    {#each words as word, index (word)}
        {#if index === currentIndex && isInitialLabelHidden}
            <span
                class="y-center absolute left-0"
                bind:clientWidth={labelWidths[index]}
                in:fly={{ y: 20, duration: 500, delay: 100, easing: cubicOut }}
                out:fly={{ y: -20, duration: 500, easing: cubicOut }}>{word}</span
            >
        {/if}
    {/each}
</span>
