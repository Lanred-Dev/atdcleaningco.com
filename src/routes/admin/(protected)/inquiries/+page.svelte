<script lang="ts">
    import type { PageServerData } from "./$types";
    import {
        Dialog,
        DialogContent,
        DialogTrigger,
        DialogContentHeader,
        getDialogContext,
    } from "#lib/components/Dialog/index.ts";
    import type { ContactInquiry } from "#lib/server/db/schema.ts";

    const { data }: { data: PageServerData } = $props();

    let ViewDialogContext = $state.raw<ReturnType<typeof getDialogContext> | undefined>();
    let viewDialogData = $state.raw<ContactInquiry | undefined>();
</script>

<Dialog bind:Context={ViewDialogContext}>
    <DialogContent>
        <DialogContentHeader>
            {#snippet Title()}
                Inquiry by {viewDialogData?.name}
            {/snippet}
        </DialogContentHeader>

        <p>{viewDialogData?.message}</p>

        <div class="w-full space-y-2">
            <p>Service: {viewDialogData?.service}</p>
            <p>Frequency: {viewDialogData?.frequency}</p>
            <p>Location: {viewDialogData?.location}</p>
            <p>Submitted: {viewDialogData?.createdAt.toLocaleString()}</p>

            <a class="button-attention" href="tel:{viewDialogData?.phone}"
                >{viewDialogData?.phone}</a
            >
            <a class="button-attention" href="mailto:{viewDialogData?.email}"
                >{viewDialogData?.email}</a
            >
        </div>
    </DialogContent>
</Dialog>

<div>
    <ol class="flex flex-col gap-2">
        {#each data.inquiries as inquiry (inquiry.id)}
            <li>
                <div class="container-primary space-y-2">
                    <div>
                        <p class="text-xl font-semibold text-title">{inquiry.name}</p>

                        <div class="flex items-center gap-2">
                            <p class="text-muted">{inquiry.email}</p>
                            <p class="text-muted">{inquiry.phone}</p>
                        </div>
                    </div>

                    <p class="text-muted">{inquiry.message}</p>

                    <DialogTrigger
                        class="button-attention tiny"
                        Context={ViewDialogContext}
                        onclick={() => {
                            if (!ViewDialogContext) return;

                            viewDialogData = inquiry;
                            ViewDialogContext.isOpen = true;
                        }}
                    >
                        View More
                    </DialogTrigger>
                </div>
            </li>
        {/each}
    </ol>
</div>
