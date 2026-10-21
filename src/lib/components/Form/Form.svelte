<script lang="ts">
    import { enhance } from "$app/forms";
    import type { Snippet } from "svelte";
    import { setFormContext, getFormContext } from "./FormContext.ts";

    let {
        method = "post",
        action,
        class: className,
        onsubmit,
        aftersubmit,
        children,
    }: {
        method?: "get" | "post";
        action: string;
        class?: string;
        onsubmit?: () => void;
        aftersubmit?: () => void;
        children: Snippet;
    } = $props();

    let FormContext = $state<ReturnType<typeof getFormContext>>({
        isSubmitting: false,
    });

    setFormContext(FormContext);
</script>

<form
    class={["flex flex-col gap-2", className]}
    {method}
    {action}
    use:enhance={() => {
        FormContext.isSubmitting = true;
        onsubmit?.();

        return async ({ update }) => {
            FormContext.isSubmitting = false;
            aftersubmit?.();
            await update();
        };
    }}
>
    {@render children()}
</form>
