<script lang="ts">
    import { getUserContext } from "./UserContext";
    import Logo from "#lib/assets/Logo.png";
    import projectPackage from "../../../../package.json";

    const user = getUserContext();
</script>

<header
    class="sticky top-0 left-0 z-40 flex items-center justify-between border-b border-primary bg-page/70 page-x-padding pt-4 pb-2 backdrop-blur-md"
>
    <div class="flex-center gap-2">
        <img class="size-12 md:size-14" src={Logo} alt="Company Logo" />

        <div>
            <p class="leading-tight font-medium">Hello, {user.name}</p>
            <p class="text-sm leading-tight text-muted">Project v{projectPackage.version}</p>
        </div>
    </div>
</header>
