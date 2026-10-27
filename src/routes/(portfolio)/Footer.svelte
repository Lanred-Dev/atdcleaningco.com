<script lang="ts">
    import Logo from "#lib/assets/Logo.png";
    import type { RouteId } from "$app/types";
    import { resolve } from "$app/paths";

    const CURRENT_YEAR: number = new Date().getFullYear();
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
</script>

<footer class="flex-center flex-col gap-y-3 border-t border-primary page-x-padding py-5 lg:py-14">
    <img src={Logo} alt="Company Logo" class="size-20" />

    <ul class="button-row">
        {#each NAVIGATION_LINKS as link (link.href)}
            <li>
                <a
                    href="{resolve(link.href)}?{new URLSearchParams(link.searchParams).toString()}"
                    class="button-link"
                >
                    {link.text}
                </a>
            </li>
        {/each}
    </ul>
    <div class="flex-center"></div>

    <p>© {CURRENT_YEAR} Attention to Detail Cleaning Company. All rights reserved.</p>
    <p>
        Designed and built by <a href="https://landonr.me" target="_blank" rel="noopener noreferrer"
            >Landon Redmond</a
        >.
    </p>
</footer>
