<script lang="ts">
    import { fade } from "svelte/transition";
    import { setViewportContext } from "./ViewportContext";
    import { setHeaderContext } from "./HeaderContext";
    import Loader from "#lib/components/Loader.svelte";
    import type { LayoutProps } from "./$types";
    import Header from "./Header.svelte";
    import Footer from "./Footer.svelte";
    import { beforeNavigate, afterNavigate } from "$app/navigation";

    let { children }: LayoutProps = $props();

    const ViewportContext = $state({
        isNavigating: false,
    });
    const HeaderContext = $state({
        height: 0,
    });

    setViewportContext(ViewportContext);
    setHeaderContext(HeaderContext);

    beforeNavigate(() => {
        ViewportContext.isNavigating = true;
    });

    afterNavigate(() => {
        if (document.scrollingElement) document.scrollingElement.scrollTop = 0;

        ViewportContext.isNavigating = false;
    });
</script>

<svelte:body style:overflow={ViewportContext.isNavigating ? "hidden" : ""} />

{#if ViewportContext.isNavigating}
    <div class="pointer-events-none fixed inset-0 z-40 bg-page" transition:fade>
        <div class="y-center x-center">
            <Loader class="size-12 stroke-black" />
        </div>
    </div>
{/if}

<div class="relative flex min-h-dvh w-full flex-col">
    <Header />

    <main
        class="flex h-full w-full flex-1 flex-col transition-opacity duration-400 ease-in-out"
        style:opacity="{ViewportContext.isNavigating ? 0 : 100}%"
        style:pointer-events={ViewportContext.isNavigating ? "none" : ""}
    >
        {@render children()}
    </main>

    <Footer />
</div>
