<!-- The reasoning behind this component is to provide a way to change the color of the icons. If these icons were used via a img tag then the color would be fixed to whatever is defined in the file. -->

<script lang="ts" module>
    const ICONS = import.meta.glob("../assets/icons/**/*.svg", {
        eager: true,
        query: "?raw",
        import: "default",
    });
</script>

<script lang="ts">
    import { onMount } from "svelte";

    import type { ClassValue } from "svelte/elements";

    let {
        icon,
        class: className,
        ...properties
    }: {
        icon: string;
        class?: ClassValue;
        [key: string]: unknown;
    } = $props();

    let content = $state.raw<string>("");

    onMount(() => {
        content = ICONS[`../assets/icons/${icon}.svg`] as string;
    });
</script>

<div class={["[&>svg]:h-full [&>svg]:w-full", className]} {...properties} role="img">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html content}
</div>
