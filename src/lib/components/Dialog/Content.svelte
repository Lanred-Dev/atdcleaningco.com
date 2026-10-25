<script lang="ts">
    import type { Snippet } from "svelte";
    import { fade, fly } from "svelte/transition";
    import { getDialogContext } from "./DialogContext.ts";
    import type { ClassValue } from "svelte/elements";
    import portal from "#lib/utils/actions/portal.ts";
    import type { HTMLAttributes } from "svelte/elements";

    let {
        children,
        class: className,
        ...properties
    }: {
        children: Snippet;
        class?: ClassValue;
        [key: string]: unknown;
    } & HTMLAttributes<HTMLDivElement> = $props();

    const DialogContext = getDialogContext();
    let ContentContainer = $state.raw<HTMLElement | null>(null);
</script>

<svelte:window
    onclick={(event) => {
        if (
            DialogContext.isOpen &&
            ContentContainer &&
            !ContentContainer.contains(event.target as Node)
        )
            DialogContext.isOpen = false;
    }}
/>

{#if DialogContext.isOpen}
    <div
        class="fixed top-0 left-0 z-50 h-full w-full backdrop-blur-sm backdrop-brightness-50"
        transition:fade={{ duration: 100 }}
        use:portal
    >
        <div class="pointer-events-none h-full w-full"></div>

        <div class="y-center x-center z-10 flex-center w-full md:px-0">
            <div
                class={["container-primary relative flex-center flex-col", className]}
                in:fly={{ y: 20, duration: 200 }}
                bind:this={ContentContainer}
                {...properties}
            >
                {@render children()}
            </div>
        </div>
    </div>
{/if}
