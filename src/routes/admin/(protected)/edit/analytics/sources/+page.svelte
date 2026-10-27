<script lang="ts">
    import type { PageServerData } from "./$types";
    import {
        Dialog,
        DialogContent,
        DialogTrigger,
        DialogContentHeader,
        getDialogContext,
    } from "#lib/components/Dialog/index.ts";
    import Icon from "#lib/components/Icon.svelte";
    import { Form, FormInput, FormSubmit } from "#lib/components/Form/index.ts";
    import type { AnalyticsSource } from "#lib/server/db/schema.ts";

    const { data }: { data: PageServerData } = $props();

    let CreateDialogContext = $state.raw<ReturnType<typeof getDialogContext> | undefined>();
    let URLGeneratorDialogContext = $state.raw<ReturnType<typeof getDialogContext> | undefined>();
    let URLGeneratorDialogData = $state.raw<AnalyticsSource | undefined>();
    let generatedURL = $state.raw<string | null>();
    let rawURL = $state.raw<string>();
</script>

<svelte:head>
    <title>Edit Analytics Sources | Attention to Detail Cleaning Company</title>
</svelte:head>

<Dialog bind:Context={CreateDialogContext}>
    <DialogTrigger class="button-attention">Create New Analytics Source</DialogTrigger>

    <DialogContent class="w-full max-w-lg">
        <DialogContentHeader>
            {#snippet Title()}
                Create New Analytics Source
            {/snippet}
        </DialogContentHeader>

        <Form
            method="post"
            action="?/createAnalyticsSource"
            class="w-full"
            aftersubmit={() => {
                if (CreateDialogContext) CreateDialogContext.isOpen = false;
            }}
        >
            <FormInput name="id">
                {#snippet Label()}
                    ID
                {/snippet}

                <input
                    type="text"
                    name="id"
                    placeholder="Unique identifier for the source"
                    required
                    class="input-primary"
                />
            </FormInput>

            <FormInput name="name">
                {#snippet Label()}
                    Name
                {/snippet}

                <input
                    type="text"
                    name="name"
                    placeholder="This is the name that will be displayed in the admin panel"
                    required
                    class="input-primary"
                />
            </FormInput>

            <FormSubmit>Create</FormSubmit>
        </Form>
    </DialogContent>
</Dialog>

<Dialog bind:Context={URLGeneratorDialogContext}>
    <DialogContent class="w-full max-w-lg">
        <DialogContentHeader>
            {#snippet Title()}
                Generating URL for source '{URLGeneratorDialogData?.name}'
            {/snippet}
        </DialogContentHeader>

        <div class="flex w-full flex-col gap-2">
            {#if typeof generatedURL === "string"}
                <p>{generatedURL}</p>
            {/if}

            <FormInput name="url">
                {#snippet Label()}
                    URL
                {/snippet}

                <input
                    type="text"
                    name="url"
                    placeholder="The base path (eg. https://atdcleaningco.com, https://atdcleaningco.com/contact, etc)"
                    required
                    class="input-primary"
                    bind:value={rawURL}
                />
            </FormInput>

            <button
                class="button-attention w-full"
                onclick={() => {
                    if (!rawURL || !URLGeneratorDialogData?.id) return;

                    const actualUrl = new URL(rawURL);
                    actualUrl.searchParams.append("source", URLGeneratorDialogData.id);
                    generatedURL = actualUrl.toString();
                }}>Generate</button
            >
        </div>
    </DialogContent>
</Dialog>

<div class="mt-8">
    <ol class="flex flex-col gap-2">
        {#each data.analyticsSources as analyticsSource (analyticsSource.id)}
            <li>
                <div class="container-primary">
                    <div class="mb-2 flex items-center justify-between">
                        <div>
                            <p class="text-xl font-semibold text-title">{analyticsSource.name}</p>
                            <p class="text-muted">{analyticsSource.id}</p>
                        </div>

                        <div class="button-row">
                            <DialogTrigger
                                class="button-primary icon"
                                Context={URLGeneratorDialogContext}
                                onclick={() => (URLGeneratorDialogData = analyticsSource)}
                            >
                                <Icon icon="URL" />
                            </DialogTrigger>

                            <Form method="post" action="?/deleteAnalyticsSource" class="m-0">
                                <input type="hidden" name="id" value={analyticsSource.id} />

                                <FormSubmit class="button-danger icon m-0!">
                                    <Icon icon="Delete" />
                                </FormSubmit>
                            </Form>
                        </div>
                    </div>
                </div>
            </li>
        {/each}
    </ol>
</div>
