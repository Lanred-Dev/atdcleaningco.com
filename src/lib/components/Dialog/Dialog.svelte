<script lang="ts">
    import { onMount, type Snippet } from "svelte";
    import { setDialogContext, getDialogContext } from "./DialogContext.ts";

    let DialogContext: ReturnType<typeof getDialogContext> = $state({
        isOpen: false,
    });

    let {
        children,
        // eslint-disable-next-line no-useless-assignment
        Context = $bindable(),
    }: {
        children: Snippet;
        Context?: ReturnType<typeof getDialogContext>;
    } = $props();

    /**
     * Sets the visibility of the popup.
     *
     * @param newValue
     */
    function setIsOpen(newIsOpen: boolean) {
        if (DialogContext.isOpen === newIsOpen) return;

        DialogContext.isOpen = newIsOpen;
    }

    setDialogContext(DialogContext);

    onMount(() => {
        Context = DialogContext;
    });
</script>

<svelte:window
    onkeydown={(event: KeyboardEvent) => {
        if (event.key === "Escape" && DialogContext.isOpen) setIsOpen(false);
    }}
/>

{@render children()}
