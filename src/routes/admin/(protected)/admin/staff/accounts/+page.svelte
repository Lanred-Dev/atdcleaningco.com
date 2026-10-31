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

    let { data }: { data: PageServerData } = $props();

    let CreateDialogContext = $state.raw<ReturnType<typeof getDialogContext> | undefined>();
</script>

<Dialog bind:Context={CreateDialogContext}>
    <DialogTrigger class="button-attention">Create Staff Account</DialogTrigger>

    <DialogContent class="w-full max-w-lg">
        <DialogContentHeader>
            {#snippet Title()}
                Create Staff Account
            {/snippet}
        </DialogContentHeader>

        <Form
            method="post"
            action="?/create"
            aftersubmit={() => {
                if (CreateDialogContext) CreateDialogContext.isOpen = false;
            }}
            class="w-full"
        >
            <FormInput name="name">
                {#snippet Label()}
                    Name
                {/snippet}

                <input
                    type="text"
                    name="name"
                    placeholder="Someone whos ready to clean"
                    required
                    class="input-primary"
                />
            </FormInput>

            <FormInput name="email">
                {#snippet Label()}
                    Email
                {/snippet}

                <input
                    type="text"
                    name="email"
                    placeholder="myemail@example.com"
                    required
                    autocomplete="username"
                    class="input-primary"
                />
            </FormInput>

            <FormInput name="password">
                {#snippet Label()}
                    Password
                {/snippet}

                <input
                    type="password"
                    name="password"
                    placeholder="securepass"
                    autocomplete="new-password"
                    class="input-primary"
                />
            </FormInput>

            <FormInput name="role">
                {#snippet Label()}
                    Role
                {/snippet}

                <select name="role" class="input-primary w-full" required>
                    <option value="" disabled selected hidden> Select a role </option>
                    <option value="admin">Admin</option>
                    <option value="user">Staff</option>
                </select>
            </FormInput>

            <FormSubmit>Create Account</FormSubmit>
        </Form>
    </DialogContent>
</Dialog>

<div class="mt-8">
    <ol class="flex flex-col gap-2">
        {#each data.staff as staff (staff.id)}
            <li>
                <div class="container-primary">
                    <div class="mb-2 flex items-center justify-between">
                        <div>
                            <p class="text-xl font-semibold text-title">{staff.name}</p>

                            <div class="flex items-center gap-2">
                                <p class="text-muted">{staff.email}</p>
                                <p class="text-muted">{staff.role}</p>
                            </div>
                        </div>

                        <div class="button-row">
                            <Form method="post" action="?/delete" class="m-0">
                                <input type="hidden" name="id" value={staff.id} />

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
