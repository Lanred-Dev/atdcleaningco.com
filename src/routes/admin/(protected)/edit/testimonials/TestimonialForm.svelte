<script lang="ts">
    import type { Snippet, ComponentProps } from "svelte";
    import { Form, FormInput, FormSubmit } from "#lib/components/Form/index.ts";

    let {
        SubmitButton,
        action,
        data,
        aftersubmit,
    }: {
        SubmitButton: Snippet;
        action: string;
        data?: Record<string, string>;
        aftersubmit?: ComponentProps<typeof Form>["aftersubmit"];
    } = $props();
</script>

<Form method="post" {action} {aftersubmit} class="w-full">
    {#if data?.id}
        <input type="hidden" name="id" value={data.id as string} />
    {/if}

    <FormInput name="name">
        {#snippet Label()}
            Name
        {/snippet}

        <input
            type="text"
            name="name"
            placeholder="Someone thats nice enough to provide a testimonial"
            required
            class="input-primary"
            value={data?.name}
        />
    </FormInput>

    <FormInput name="location">
        {#snippet Label()}
            Location
        {/snippet}

        <input
            type="text"
            name="location"
            placeholder="Somewhere located in the coverage area :)"
            required
            class="input-primary"
            value={data?.location}
        />
    </FormInput>

    <FormInput name="text">
        {#snippet Label()}
            Testimonial
        {/snippet}

        <textarea
            name="text"
            placeholder="Hopefully, something nice"
            required
            class="input-primary min-h-40"
            value={data?.text}></textarea>
    </FormInput>

    <FormSubmit>
        {@render SubmitButton()}
    </FormSubmit>
</Form>
