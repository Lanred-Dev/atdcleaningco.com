<script lang="ts">
    import type { Snippet } from "svelte";
    import type { RouteId } from "$app/types";
    import { resolve } from "$app/paths";

    let { href, Title, Description }: { href: RouteId; Title: Snippet; Description: Snippet } =
        $props();
</script>

<a
    class="group container-primary flex flex-col p-0 transition-all hover:-translate-y-1 hover:shadow-md"
    href={resolve(href)}
>
    <div class="p-4">
        <p class="text-lg font-semibold">{@render Title()}</p>
        <p class="text-muted-foreground text-sm">{@render Description()}</p>
    </div>
</a>
