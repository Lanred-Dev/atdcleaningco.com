<script lang="ts">
    import type { Snippet } from "svelte";
    import type { LayoutServerData } from "./$types";
    import { setUserContext } from "./UserContext";
    import Header from "./Header.svelte";

    let { data, children }: { data: LayoutServerData; children: Snippet } = $props();

    setUserContext({
        get id() {
            return data.user.id;
        },
        get name() {
            return data.user.name;
        },
    });
</script>

<div class="relative flex min-h-dvh w-full flex-col">
    <Header />

    <main class="h-full w-full flex-1 page-x-padding pt-12">
        {@render children()}
    </main>
</div>
