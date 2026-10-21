<script lang="ts">
    import "./layout.css";
    import LogoWithBackground from "#lib/assets/LogoWithBackground.webp";
    import type { LayoutProps } from "./$types";

    let { children }: LayoutProps = $props();
</script>

<svelte:head>
    <link rel="icon" href={LogoWithBackground} />
</svelte:head>

{@render children()}
