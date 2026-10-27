<script lang="ts">
    import { Form, FormInput, FormSubmit, FormInputGroup } from "#lib/components/Form/index.ts";
    import Icon from "#lib/components/Icon.svelte";
    import { getHeaderContext } from "../HeaderContext";
    import type { PageServerData } from "./$types";
    import { goto } from "$app/navigation";
    import { resolve } from "$app/paths";

    let { data }: { data: PageServerData } = $props();

    const HeaderContext = getHeaderContext();
    let showExpandedFields = $state.raw<boolean>(false);
</script>

<svelte:head>
    <title>Contact | Attention to Detail Cleaning Company</title>
</svelte:head>

<div class="lg:grid lg:grid-cols-2" style:min-height="calc(100dvh - {HeaderContext.height}px)">
    <div
        class="page-title w-full items-start page-x-padding text-left lg:mb-0 lg:h-full lg:rounded-tr-container lg:pr-12"
    >
        <h1 class="title">
            {#if data.mode === "quote"}
                Get your free quote
            {:else}
                Reach out to us
            {/if}
        </h1>

        <p class="subtitle">
            {#if data.mode === "quote"}
                Tell us about your cleaning needs and we'll get back to you with a customized plan
                and estimate.
            {:else}
                We would love to hear from you! Please fill out the form below and we will get back
                to you as soon as possible.
            {/if}
        </p>

        <div class="mt-6 flex w-full flex-col gap-2">
            {#snippet ContactCard(icon: string, title: string, content: string, href: string)}
                <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
                <a class="text-left" {href}>
                    <div class="flex items-center gap-1">
                        <Icon {icon} class="size-5" />
                        <p class="text-sm text-muted">{title}</p>
                    </div>

                    <p class="ml-6">{content}</p>
                </a>
            {/snippet}

            {@render ContactCard(
                "Phone",
                "Residential",
                data.companyInfo.residentialPhone,
                `tel:${data.companyInfo.residentialPhone}`
            )}
            {@render ContactCard(
                "Phone",
                "Commercial",
                data.companyInfo.commercialPhone,
                `tel:${data.companyInfo.commercialPhone}`
            )}
            {@render ContactCard(
                "Mail",
                "Email",
                data.companyInfo.email,
                `mailto:${data.companyInfo.email}`
            )}
        </div>
    </div>

    <div class="w-full page-x-padding pb-12 lg:flex-center lg:pl-12">
        <Form
            method="post"
            action="?/submitInquiry"
            class="w-full"
            aftersubmit={() => goto(resolve("/(portfolio)/contact/success"))}
        >
            <FormInputGroup>
                <FormInput name="firstName">
                    {#snippet Label()}
                        First Name
                    {/snippet}

                    <input
                        type="text"
                        name="firstName"
                        placeholder="Bob"
                        required
                        class="input-primary"
                    />
                </FormInput>

                <FormInput name="lastName">
                    {#snippet Label()}
                        Last Name
                    {/snippet}

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Smith"
                        required
                        class="input-primary"
                    />
                </FormInput>
            </FormInputGroup>

            <FormInput name="phone">
                {#snippet Label()}
                    Phone Number
                {/snippet}

                <input
                    type="tel"
                    name="phone"
                    placeholder="(123) 456-7890"
                    pattern={"(\\(\\d{3}\\)\\s?|\\d{3}[\\-\\s]?)\\d{3}[\\-\\s]?\\d{4}"}
                    required
                    class="input-primary"
                />
            </FormInput>

            <FormInput name="email">
                {#snippet Label()}
                    Email Address
                {/snippet}

                <input
                    type="email"
                    name="email"
                    placeholder="bobsmithismyname@example.com"
                    required
                    class="input-primary"
                />
            </FormInput>

            {#if data.mode === "quote" || showExpandedFields}
                <FormInput name="location">
                    {#snippet Label()}
                        Location
                    {/snippet}

                    <input
                        type="text"
                        name="location"
                        placeholder="Somewhere located in the coverage area :)"
                        class="input-primary"
                    />
                </FormInput>

                <FormInputGroup>
                    <FormInput name="service">
                        {#snippet Label()}
                            Service
                        {/snippet}

                        <select name="service" class="input-primary w-full">
                            <option value="" disabled selected hidden> Select a service </option>
                            <option value="residential">Residential Cleaning</option>
                            <option value="commercial">Commercial Cleaning</option>
                            <option value="other">Other</option>
                        </select>
                    </FormInput>

                    <FormInput name="frequency">
                        {#snippet Label()}
                            Frequency
                        {/snippet}

                        <select name="frequency" class="input-primary w-full">
                            <option value="" disabled selected hidden> Select a frequency </option>
                            <option value="one-time">One Time</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="bi-weekly">Bi-Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </FormInput>
                </FormInputGroup>
            {:else}
                <div class="relative mt-2 h-px w-full bg-button-primary">
                    <button
                        type="button"
                        class="y-center x-center flex-center gap-1 bg-page px-2 text-sm"
                        onclick={() => (showExpandedFields = true)}
                    >
                        Show all fields <Icon icon="Chevrons/Down" class="size-4" />
                    </button>
                </div>
            {/if}

            <FormInput name="message">
                {#snippet Label()}
                    {#if data.mode === "quote"}
                        Tell us about your cleaning needs
                    {:else}
                        Message
                    {/if}
                {/snippet}

                <textarea
                    placeholder="Hopefully, something nice"
                    name="message"
                    required
                    class="input-primary min-h-40"></textarea>
            </FormInput>

            <FormSubmit>
                Request a Quote <Icon icon="PaperAirplane" />
            </FormSubmit>
        </Form>
    </div>
</div>
