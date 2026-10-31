<script lang="ts">
    import { getUserContext } from "./UserContext";
    import Logo from "#lib/assets/Logo.png";
    import { resolve } from "$app/paths";
    import { page } from "$app/state";
    import Icon from "#lib/components/Icon.svelte";

    const user = getUserContext();
</script>

<header class="page-x-padding pt-4 pb-2">
    <div class="relative flex items-center justify-between">
        <div class="flex-center gap-2">
            <img class="size-12 md:size-14" src={Logo} alt="Company Logo" />

            <p class="leading-none">
                <span class="text-sm text-muted">Hello,</span>
                <br />
                <span class="font-medium">{user.name}</span>
            </p>
        </div>

        <div class="flex-center gap-2">
            {#if !page.url.pathname.endsWith("/home")}
                <a class="button-primary tiny icon" href={resolve("/admin/(protected)/(index)")}>
                    <Icon icon="Home" />
                </a>
            {/if}

            <a class="button-attention tiny" href={resolve("/admin/(protected)/sign-out")}
                >Sign Out</a
            >
        </div>
    </div>
</header>
