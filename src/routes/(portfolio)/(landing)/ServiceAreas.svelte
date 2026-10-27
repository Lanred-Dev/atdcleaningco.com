<script lang="ts">
    import { Map } from "mapbox-gl/esm";
    import "mapbox-gl/dist/mapbox-gl.css";
    import { onMount } from "svelte";
    import { MAPBOX_ACCESS_TOKEN } from "$app/env/public";
    import {
        Dialog,
        DialogContent,
        DialogTrigger,
        DialogContentHeader,
        getDialogContext,
    } from "#lib/components/Dialog/index.ts";
    import AnimatedCheckmark from "#lib/components/AnimatedCheckmark.svelte";
    import { resolve } from "$app/paths";
    import AnimatedX from "#lib/components/AnimatedX.svelte";
    import type { PageServerData } from "./$types";

    const BOUND_BUFFER: number = 1;

    let { companyInfo }: { companyInfo: PageServerData["companyInfo"] } = $props();

    let MapContainer: HTMLDivElement;
    let ServiceAreaDialogContext = $state.raw<ReturnType<typeof getDialogContext> | undefined>();
    let customerZipCode = $state.raw<string | undefined>();
    let isCustomerZipCodeServiced = $derived<boolean>(
        companyInfo.serviceAreas.includes(customerZipCode ?? "")
    );

    onMount(() => {
        const map = new Map({
            accessToken: MAPBOX_ACCESS_TOKEN,
            container: MapContainer,
            style: "mapbox://styles/mapbox/dark-v11",
            bounds: [
                [
                    companyInfo.serviceAreasGeoJson.bounds[0],
                    companyInfo.serviceAreasGeoJson.bounds[1],
                ],
                [
                    companyInfo.serviceAreasGeoJson.bounds[2],
                    companyInfo.serviceAreasGeoJson.bounds[3],
                ],
            ],
            maxBounds: [
                [
                    companyInfo.serviceAreasGeoJson.bounds[0] - BOUND_BUFFER,
                    companyInfo.serviceAreasGeoJson.bounds[1] - BOUND_BUFFER,
                ],
                [
                    companyInfo.serviceAreasGeoJson.bounds[2] + BOUND_BUFFER,
                    companyInfo.serviceAreasGeoJson.bounds[3] + BOUND_BUFFER,
                ],
            ],
            fitBoundsOptions: {
                padding: 20,
            },
        });

        map.on("load", () => {
            map.addSource("serviceAreas", {
                type: "geojson",
                data: companyInfo.serviceAreasGeoJson,
            });

            map.addLayer({
                id: "zips-layer",
                type: "fill",
                source: "serviceAreas",
                paint: {
                    "fill-color": getComputedStyle(document.documentElement).getPropertyValue(
                        "--color-attention"
                    ),
                    "fill-opacity": 0.4,
                    "fill-outline-color": "#ffffff",
                },
            });
        });

        return () => {
            map.remove();
        };
    });
</script>

<section>
    <div class="section-title">
        <h2 class="title">
            Service areas <span class="text-attention">we proudly serve</span>
        </h2>

        <p class="subtitle">
            We provide residential and commercial cleaning services across Central and North
            Alabama. Check out the map below to see if we serve your area.
        </p>
    </div>

    <div class="flex flex-wrap justify-center gap-8 page-x-padding">
        <div
            class="aspect-3/2 w-full overflow-hidden rounded-container md:w-120 lg:w-130 xl:w-150"
            bind:this={MapContainer}
        ></div>

        <div class="container-primary h-fit w-full lg:max-w-sm">
            <p class="text-xl text-title">Do we service your area?</p>

            <div class="mt-4 button-row">
                <input
                    type="text"
                    pattern="[0-9]*"
                    placeholder="Enter your zip code"
                    class="input-primary grow"
                    bind:value={customerZipCode}
                />

                <div>
                    <DialogTrigger
                        Context={ServiceAreaDialogContext}
                        class="button-attention"
                        disabled={!customerZipCode?.length}
                    >
                        Check</DialogTrigger
                    >
                </div>
            </div>
        </div>
    </div>
</section>

<Dialog bind:Context={ServiceAreaDialogContext}>
    <DialogContent class="w-full max-w-lg">
        <DialogContentHeader />

        <div>
            {#if isCustomerZipCodeServiced}
                <AnimatedCheckmark class="size-18" />
            {:else}
                <AnimatedX class="size-18" />
            {/if}
        </div>

        <div class="my-8 text-center">
            <p class="text-2xl font-bold">
                {#if isCustomerZipCodeServiced}
                    Great news! We service your area!
                {:else}
                    We're not quite there yet
                {/if}
            </p>

            <p class="text-lg">
                {#if isCustomerZipCodeServiced}
                    We are happy to let you know that we provide cleaning services in your area.
                    Please feel free to reach out to us for a quote or to schedule a cleaning.
                {:else}
                    Unfortunately, we do not currently provide cleaning services in your area.
                    However, we may still be able to serve you. Please feel free to reach out to us
                    and we will do our best to assist you.
                {/if}
            </p>
        </div>

        <div class="button-row w-full">
            <a
                href="{resolve('/(portfolio)/contact')}?mode={isCustomerZipCodeServiced
                    ? 'quote'
                    : 'contact'}"
                class="button-attention w-full"
            >
                {#if isCustomerZipCodeServiced}
                    Request a Quote
                {:else}
                    Contact Us
                {/if}
            </a>
        </div>
    </DialogContent>
</Dialog>
