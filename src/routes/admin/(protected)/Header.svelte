<script lang="ts">
    import { getUserContext } from "./UserContext";
    import Logo from "#lib/assets/Logo.png";
    import { authClient } from "#lib/authClient.ts";
    import { goto } from "$app/navigation";
    import { resolve } from "$app/paths";

    const user = getUserContext();
</script>

<header class="flex items-center justify-between page-x-padding pt-4 pb-2">
    <div class="flex-center gap-2">
        <img class="size-12 md:size-14" src={Logo} alt="Company Logo" />

        <p class="leading-none">
            <span class="text-sm text-muted">Hello,</span>
            <br />
            <span class="font-medium">{user.name}</span>
        </p>
    </div>

    <button
        class="button-attention tiny"
        onclick={async () => {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        goto(resolve("/admin/login"));
                    },
                },
            });
        }}>Sign Out</button
    >
</header>
