<script lang="ts">
    import { getDialogContext } from "./DialogContext.ts";
    import type { HTMLButtonAttributes } from "svelte/elements";

    let {
        children,
        Context: DialogContext = getDialogContext(),
        onclick,
        ...properties
    }: {
        Context?: ReturnType<typeof getDialogContext>;
    } & HTMLButtonAttributes = $props();
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
    {@render children?.()}
</button>
