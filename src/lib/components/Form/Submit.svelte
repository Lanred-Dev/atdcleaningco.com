<script lang="ts">
    import type { Snippet } from "svelte";
    import { getFormContext } from "./FormContext.ts";
    import Loader from "#lib/components/Loader.svelte";
    import type { HTMLButtonAttributes } from "svelte/elements";

    let {
        children,
        class: className,
        ...properties
    }: {
        children: Snippet;
        [key: string]: unknown;
    } & HTMLButtonAttributes = $props();

    const FormContext = getFormContext();
</script>

<button
    class={["button-attention mt-2 w-full", className]}
    disabled={FormContext.isSubmitting}
    type="submit"
    {...properties}
>
    {#if FormContext.isSubmitting}
        <Loader class="size-7 stroke-black" />
    {:else}
        {@render children()}
    {/if}
</button>
