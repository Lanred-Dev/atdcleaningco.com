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
    import type { MarketingCampaign } from "#lib/server/db/schema.ts";

    const { data }: { data: PageServerData } = $props();

    let CreateDialogContext = $state.raw<ReturnType<typeof getDialogContext> | undefined>();
    let CampaignURLGeneratorDialogContext = $state.raw<
        ReturnType<typeof getDialogContext> | undefined
    >();
    let CampaignURLGeneratorDialogData = $state.raw<MarketingCampaign | undefined>();
    let generatedCampaignURL = $state.raw<string | null>();
    let targetCampaignURL = $state.raw<string>();
</script>

<svelte:head>
    <title>Edit Marketing Campaigns | Attention to Detail Cleaning Company</title>
</svelte:head>

<Dialog bind:Context={CreateDialogContext}>
    <DialogTrigger class="button-attention">Create New Campaign</DialogTrigger>

    <DialogContent class="w-full max-w-lg">
        <DialogContentHeader>
            {#snippet Title()}
                Create New Campaign
            {/snippet}
        </DialogContentHeader>

        <Form
            method="post"
            action="?/create"
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
                    placeholder="Unique identifier for the campaign"
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

<Dialog bind:Context={CampaignURLGeneratorDialogContext}>
    <DialogContent class="w-full max-w-lg">
        <DialogContentHeader>
            {#snippet Title()}
                Generating URL with campaign '{CampaignURLGeneratorDialogData?.name}'
            {/snippet}
        </DialogContentHeader>

        <div class="flex w-full flex-col gap-2">
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
                    bind:value={targetCampaignURL}
                />
            </FormInput>

            <button
                class="button-attention w-full"
                onclick={() => {
                    if (!targetCampaignURL || !CampaignURLGeneratorDialogData?.id) return;

                    const actualUrl = new URL(targetCampaignURL);
                    actualUrl.searchParams.append("source", CampaignURLGeneratorDialogData.id);
                    generatedCampaignURL = actualUrl.toString();
                }}>Generate</button
            >

            {#if typeof generatedCampaignURL === "string"}
                <p>{generatedCampaignURL}</p>
            {/if}
        </div>
    </DialogContent>
</Dialog>

<div class="mt-8">
    <ol class="flex flex-col gap-2">
        {#each data.campaigns as campaign (campaign.id)}
            <li>
                <div
                    class={[
                        "container-primary",
                        campaign.isCore && "cursor-not-allowed opacity-50",
                    ]}
                >
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-xl font-semibold text-title">{campaign.name}</p>
                            <p class="text-muted">{campaign.id}</p>
                        </div>

                        <div class={["button-row", campaign.isCore && "hidden"]}>
                            <DialogTrigger
                                class="button-primary icon"
                                Context={CampaignURLGeneratorDialogContext}
                                onclick={() => (CampaignURLGeneratorDialogData = campaign)}
                            >
                                <Icon icon="URL" />
                            </DialogTrigger>

                            <Form method="post" action="?/delete" class="m-0">
                                <input type="hidden" name="id" value={campaign.id} />

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
