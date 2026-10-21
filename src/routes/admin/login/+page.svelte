<script lang="ts">
    import { Form, FormInput, FormSubmit } from "#lib/components/Form/index.ts";
    import Logo from "#lib/assets/Logo.png";
    import { resolve } from "$app/paths";
</script>

<svelte:head>
    <title>Admin Login | Attention to Detail Cleaning Company</title>
</svelte:head>

<div
    class="container-primary y-center x-center flex-center w-full max-w-11/12 flex-col gap-10 md:max-w-lg"
>
    <div class="flex-center w-full flex-col text-center">
        <img class="mb-2 size-20" src={Logo} alt="Company Logo" />
        <h1 class="text-3xl font-bold text-title">Admin Login</h1>
        <p class="text-lg">This page is intended for administrators only.</p>
    </div>

    <Form method="post" action="?/signIn" class="w-full">
        <FormInput name="email">
            {#snippet label()}
                Email
            {/snippet}

            <input
                type="text"
                name="email"
                placeholder="myemail@example.com"
                required
                class="input-primary"
            />
        </FormInput>

        <FormInput name="password">
            {#snippet label()}
                Password
            {/snippet}

            <input
                type="password"
                name="password"
                placeholder="123isalwayssecure"
                required
                class="input-primary"
            />
        </FormInput>

        <FormSubmit>Sign In</FormSubmit>
    </Form>
</div>

<p class="absolute bottom-3 w-full text-center text-sm">
    Didnt mean to end up here? <a
        href={resolve("/(portfolio)/(landing)")}
        class="text-blue-500 hover:underline">Go back</a
    >
</p>
