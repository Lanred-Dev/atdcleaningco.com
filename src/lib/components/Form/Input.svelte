<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        name,
        Label,
        children,
    }: {
        name: string;
        Label: Snippet;
        children: Snippet;
    } = $props();
</script>

<div class="flex flex-1 flex-col gap-0.5">
    <label for={name} class="pl-5 text-sm font-semibold text-muted">
        {@render Label()}
    </label>

    {@render children()}
</div>
