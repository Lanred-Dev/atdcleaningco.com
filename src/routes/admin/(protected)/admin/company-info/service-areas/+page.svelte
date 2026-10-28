<script lang="ts">
    import type { PageServerData } from "./$types";
    import { Form, FormSubmit, FormInput } from "#lib/components/Form/index.ts";

    const { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
    <title>Edit Service Areas | Attention to Detail Cleaning Company</title>
</svelte:head>

<Form action="?/update">
    <FormInput name="serviceAreas">
        {#snippet Label()}
            Service Areas
        {/snippet}

        <input
            type="text"
            name="serviceAreas"
            placeholder="12345, 90000, 00000"
            required
            multiple
            class="input-primary"
            value={data.companyInfo.serviceAreas.join(", ")}
        />
    </FormInput>

    <FormSubmit>Save Changes</FormSubmit>
</Form>
