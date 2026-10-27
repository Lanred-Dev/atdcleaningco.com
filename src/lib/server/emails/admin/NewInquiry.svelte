<script>
    import { Html, Head, Body, Preview, Text } from "@better-svelte-email/components";

    let { name } = $props();
</script>

<Html>
    <Head />

    <Body>
        <Preview preview="New Inquiry" />

        <Text>There is a new inquiry from {name}.</Text>
        <Text>Check the admin dashboard for more details.</Text>
    </Body>
</Html>
