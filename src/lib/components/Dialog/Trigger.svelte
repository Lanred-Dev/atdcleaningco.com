<script lang="ts">
    import type { Snippet } from "svelte";
    import { getDialogContext } from "./DialogContext.ts";

    let {
        children,
        Context: DialogContext = getDialogContext(),
        onclick,
        ...properties
    }: {
        children: Snippet;
        Context?: ReturnType<typeof getDialogContext>;
        onclick?: (event: MouseEvent) => void;
        [key: string]: unknown;
    } = $props();
</script>

<button
    type="button"
    onclick={(event) => {
        event.stopPropagation();
        DialogContext.isOpen = !DialogContext.isOpen;

        onclick?.(event);
    }}
    {...properties}
>
    {@render children()}
</button>
