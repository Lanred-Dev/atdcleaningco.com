<script lang="ts">
    import type { Snippet } from "svelte";
    import type { ClassValue } from "svelte/elements";
    import { getFormContext } from "./FormContext.ts";
    import Loader from "#lib/components/Loader.svelte";

    let {
        class: className,
        children,
    }: {
        class?: ClassValue;
        children: Snippet;
    } = $props();

    const FormContext = getFormContext();
</script>

<button
    class={["button-attention mt-2 w-full", className]}
    disabled={FormContext.isSubmitting}
    type="submit"
>
    {#if FormContext.isSubmitting}
        <Loader size={1.75} color="black" />
    {:else}
        {@render children()}
    {/if}
</button>
