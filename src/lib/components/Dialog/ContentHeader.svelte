<script lang="ts">
    import Icon from "../Icon.svelte";
    import Trigger from "./Trigger.svelte";
    import type { Snippet } from "svelte";

    let {
        Title,
        includeCloseButton = true,
    }: {
        Title: Snippet;
        includeCloseButton?: boolean;
    } = $props();
</script>

<div class="relative mb-2 flex-center w-full px-2 sm:px-5 md:px-11">
    <p class="text-center text-3xl font-bold">{@render Title()}</p>
</div>

{#if includeCloseButton}
    <Trigger class="button-primary absolute top-2 right-2 size-10 rounded-full p-1.5">
        <Icon icon="X" />
    </Trigger>
{/if}
