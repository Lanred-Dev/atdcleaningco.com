<script lang="ts">
    import { getViewportContext } from "./ViewportContext";
    import { getHeaderContext } from "./HeaderContext";
    import Logo from "#lib/assets/Logo.png";
    import { resolve } from "$app/paths";
    import type { RouteId } from "$app/types";
    import { MediaQuery } from "svelte/reactivity";
    import { fly } from "svelte/transition";
    import { scrollY } from "svelte/reactivity/window";

    const NAVIGATION_LINKS: {
        href: RouteId;
        searchParams?: Record<string, string>;
        text: string;
    }[] = [
        { href: "/(portfolio)/(landing)/#about", text: "About" },
        { href: "/(portfolio)/(landing)/#services", text: "Services" },
        { href: "/(portfolio)/(landing)/#portfolio", text: "Portfolio" },
        { href: "/(portfolio)/contact", searchParams: { mode: "contact" }, text: "Contact" },
    ];

    const ViewportContext = getViewportContext();
    const HeaderContext = getHeaderContext();
    const isMobile: MediaQuery = new MediaQuery("(max-width: 768px)", true);
    let isMenuOpen = $state.raw<boolean>(false);

    $effect(() => {
        if (!isMobile.current || ViewportContext.isNavigating) isMenuOpen = false;
    });
</script>

<header class="sticky top-0 left-0 z-40">
    <!-- The height is binded ONLY to the actual content of the header and not the navigation menu that will appear on mobile devices. -->
    <div
        class={[
            "flex w-full items-center justify-between border-b page-x-padding pt-4 pb-2",
            (scrollY.current ?? 0) > 15 || isMenuOpen
                ? "border-primary bg-page/70 backdrop-blur-md"
                : "border-transparent bg-transparent backdrop-blur-none",
        ]}
        bind:clientHeight={HeaderContext.height}
    >
        <img src={Logo} alt="Company Logo" class="size-12 md:size-14" />

        {#if !isMobile.current}
            <nav class="y-center x-center absolute">
                <ul class="button-row">
                    {#each NAVIGATION_LINKS as link (link.href)}
                        <li>
                            <a
                                href="{resolve(link.href)}?{new URLSearchParams(
                                    link.searchParams
                                ).toString()}"
                                class="button-link"
                            >
                                {link.text}
                            </a>
                        </li>
                    {/each}
                </ul>
            </nav>
        {/if}

        <a
            href="{resolve('/(portfolio)/contact')}?mode=quote"
            class="button-attention tiny hidden md:block">Get a Quote</a
        >

        <button
            class="relative h-5 w-6 md:hidden"
            onclick={() => (isMenuOpen = !isMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMenuOpen}
        >
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
        </button>
    </div>

    {#if isMobile.current && isMenuOpen}
        <nav
            class="absolute top-full w-full border-b border-primary bg-page/70 page-x-padding py-5 backdrop-blur-md"
            transition:fly={{ y: -20, duration: 300 }}
        >
            <ul class="flex flex-col gap-y-5">
                {#each NAVIGATION_LINKS as link (link.href)}
                    <li>
                        <a
                            href="{resolve(link.href)}?{new URLSearchParams(
                                link.searchParams
                            ).toString()}"
                            class="button-link"
                        >
                            {link.text}
                        </a>
                    </li>
                {/each}

                <li>
                    <a href={resolve("/(portfolio)/contact")} class="button-attention tiny"
                        >Get a Quote</a
                    >
                </li>
            </ul>
        </nav>
    {/if}
</header>

<style>
    @reference "../layout.css";

    .hamburger-line {
        @apply x-center absolute inline-block h-0.75 w-full transform-gpu rounded-full bg-black transition-all duration-300;
    }

    button[aria-expanded="false"] .hamburger-line:nth-child(1) {
        @apply top-0;
    }

    button[aria-expanded="false"] .hamburger-line:nth-child(2) {
        @apply y-center;
    }

    button[aria-expanded="false"] .hamburger-line:nth-child(3) {
        @apply bottom-0;
    }

    button[aria-expanded="true"] .hamburger-line:nth-child(1) {
        @apply y-center rotate-45;
    }

    button[aria-expanded="true"] .hamburger-line:nth-child(2) {
        @apply opacity-0;
    }

    button[aria-expanded="true"] .hamburger-line:nth-child(3) {
        @apply bottom-1/2 translate-y-1/2 -rotate-45;
    }
</style>
