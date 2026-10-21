<script lang="ts">
    import type { Snippet } from "svelte";

    let {
        name,
        label,
        children,
    }: {
        name: string;
        label: Snippet;
        children: Snippet;
    } = $props();
</script>

<div class="flex flex-col gap-0.5">
    <label for={name} class="pl-5 text-sm font-semibold text-muted">
        {@render label()}
    </label>

    {@render children()}
</div>
