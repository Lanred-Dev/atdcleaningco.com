<script lang="ts">
    import type { PageServerData } from "./$types";
    import {
        Dialog,
        DialogContent,
        DialogTrigger,
        DialogContentHeader,
        getDialogContext,
    } from "#lib/components/Dialog/index.ts";
    import TestimonialForm from "./TestimonialForm.svelte";
    import Icon from "#lib/components/Icon.svelte";
    import { Form, FormSubmit } from "#lib/components/Form/index.ts";

    const { data }: { data: PageServerData } = $props();

    let EditDialogContext = $state.raw<ReturnType<typeof getDialogContext> | undefined>();
    let CreateDialogContext = $state.raw<ReturnType<typeof getDialogContext> | undefined>();
    let editDialogData = $state<Record<string, string> | undefined>();
</script>

<svelte:head>
    <title>Edit Testimonials | Attention to Detail Cleaning Company</title>
</svelte:head>

<Dialog bind:Context={CreateDialogContext}>
    <DialogTrigger class="button-attention">Create New Testimonial</DialogTrigger>

    <DialogContent class="w-full max-w-lg">
        <DialogContentHeader>
            {#snippet Title()}
                Create New Testimonial
            {/snippet}
        </DialogContentHeader>

        <TestimonialForm
            action="?/createTestimonial"
            aftersubmit={() => {
                if (CreateDialogContext) CreateDialogContext.isOpen = false;
            }}
        >
            {#snippet SubmitButton()}
                Create
            {/snippet}
        </TestimonialForm>
    </DialogContent>
</Dialog>

<Dialog bind:Context={EditDialogContext}>
    <DialogContent class="w-full max-w-lg">
        <DialogContentHeader>
            {#snippet Title()}
                Edit Testimonial
            {/snippet}
        </DialogContentHeader>

        <TestimonialForm
            action="?/updateTestimonial"
            data={editDialogData}
            aftersubmit={() => {
                if (EditDialogContext) EditDialogContext.isOpen = false;
            }}
        >
            {#snippet SubmitButton()}
                Update
            {/snippet}
        </TestimonialForm>
    </DialogContent>
</Dialog>

<div class="mt-8">
    <ol class="flex flex-col gap-2">
        {#each data.testimonials as testimonial (testimonial.id)}
            <li>
                <div class="container-primary">
                    <div class="mb-2 flex items-center justify-between">
                        <div>
                            <p class="text-xl font-semibold text-title">{testimonial.name}</p>
                            <p class="text-muted">{testimonial.location}</p>
                        </div>

                        <div class="button-row">
                            <DialogTrigger
                                class="button-primary icon"
                                Context={EditDialogContext}
                                onclick={() =>
                                    (editDialogData = {
                                        name: testimonial.name,
                                        location: testimonial.location,
                                        text: testimonial.text,
                                        id: testimonial.id,
                                    })}
                            >
                                <Icon icon="Edit" />
                            </DialogTrigger>

                            <Form method="post" action="?/deleteTestimonial" class="m-0">
                                <input type="hidden" name="id" value={testimonial.id} />

                                <FormSubmit class="button-danger icon m-0!">
                                    <Icon icon="Delete" />
                                </FormSubmit>
                            </Form>
                        </div>
                    </div>

                    <p>{testimonial.text}</p>
                </div>
            </li>
        {/each}
    </ol>
</div>
