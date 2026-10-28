<script lang="ts">
    import type { PageServerData } from "./$types";
    import { Form, FormSubmit, FormInput } from "#lib/components/Form/index.ts";

    const { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
    <title>Edit Contact Info | Attention to Detail Cleaning Company</title>
</svelte:head>

<Form action="?/update">
    <FormInput name="residentialPhone">
        {#snippet Label()}
            Residential Phone
        {/snippet}

        <input
            type="tel"
            name="residentialPhone"
            placeholder="(123) 456-7890"
            required
            pattern={"(\\(\\d{3}\\)\\s?|\\d{3}[\\-\\s]?)\\d{3}[\\-\\s]?\\d{4}"}
            class="input-primary"
            value={data.companyInfo.residentialPhone}
        />
    </FormInput>

    <FormInput name="commercialPhone">
        {#snippet Label()}
            Commercial Phone
        {/snippet}

        <input
            type="tel"
            name="commercialPhone"
            placeholder="(123) 456-7890"
            required
            class="input-primary"
            pattern={"(\\(\\d{3}\\)\\s?|\\d{3}[\\-\\s]?)\\d{3}[\\-\\s]?\\d{4}"}
            value={data.companyInfo.commercialPhone}
        />
    </FormInput>

    <FormInput name="email">
        {#snippet Label()}
            Email
        {/snippet}

        <input
            type="email"
            name="email"
            placeholder="you@example.com"
            required
            class="input-primary"
            value={data.companyInfo.email}
        />
    </FormInput>

    <FormSubmit>Save Changes</FormSubmit>
</Form>
