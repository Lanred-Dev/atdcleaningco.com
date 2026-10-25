<script lang="ts">
    import type { Snippet } from "svelte";
    import { getFormContext } from "./FormContext.ts";
    import Loader from "#lib/components/Loader.svelte";
    import type { HTMLAttributes } from "svelte/elements";

    let {
        children,
        class: className,
        ...properties
    }: {
        children: Snippet;
    } & HTMLAttributes<HTMLButtonElement> = $props();

    const FormContext = getFormContext();
</script>

<button
    class={["button-attention mt-2 w-full", className]}
    disabled={FormContext.isSubmitting}
    type="submit"
    {...properties}
>
    {#if FormContext.isSubmitting}
        <Loader size={1.75} color="black" />
    {:else}
        {@render children()}
    {/if}
</button>
