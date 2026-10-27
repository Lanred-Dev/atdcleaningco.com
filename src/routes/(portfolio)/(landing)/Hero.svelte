<script module lang="ts">
    // eslint-disable-next-line svelte/prefer-svelte-reactivity
    const groupedComparisons = new Map<string, { before?: string; after?: string }>();

    for (const [path, url] of Object.entries(
        import.meta.glob<string>("#lib/assets/comparisons/**/*.webp", {
            eager: true,
            query: "?url",
            import: "default",
        })
    )) {
        const match = path.match(/\/comparisons\/([^/]+)\/(before|after)\.webp$/i);
        if (!match) continue;

        const [, folder, type] = match;
        const key = type.toLowerCase() as "before" | "after";

        const entry = groupedComparisons.get(folder) ?? {};
        entry[key] = url;
        groupedComparisons.set(folder, entry);
    }

    const COMPARISON_IMAGES = Array.from(groupedComparisons.values()).filter(
        (item): item is { before: string; after: string } => Boolean(item.before && item.after)
    );
    const TITLE_ADJECTIVES: string[] = ["cleaner", "spotless", "tidy", "pristine", "clutter-free"];
</script>

<script lang="ts">
    import RotatingText from "#lib/components/RotatingText.svelte";
    import ComparableImage from "#lib/components/ComparableImage.svelte";
    import { resolve } from "$app/paths";
    import ActionStack from "./ActionStack.svelte";
    import { getHeaderContext } from "../HeaderContext";
    import Icon from "#lib/components/Icon.svelte";

    // This is done so that SSR and Hydration match. Better way? Probably.
    const comparisonImage =
        COMPARISON_IMAGES[Math.floor(Date.now() / 10000) % COMPARISON_IMAGES.length];
    const HeaderContext = getHeaderContext();
</script>

<div class="flex flex-col pt-10 lg:pt-0" style:min-height="calc(100dvh - {HeaderContext.height}px)">
    <div
        class="flex min-h-fit w-full flex-col gap-y-12 page-x-padding pb-[10dvh] sm:gap-y-14 lg:grow lg:flex-row lg:items-center lg:justify-center lg:gap-x-10"
    >
        <div class="max-w-xl space-y-5 lg:min-w-xl lg:space-y-8">
            <h1
                class="text-3xl font-bold text-title fly-in animate-delay-500 animate-duration-500 sm:text-5xl lg:text-6xl"
            >
                A
                <RotatingText words={TITLE_ADJECTIVES} class="text-attention" />
                space,
                <br />every single time
            </h1>

            <p class="text-lg fly-in animate-delay-600 animate-duration-500 md:text-xl">
                Attention to Detail Cleaning Company delivers reliable residential and commercial
                cleaning across Central and North Alabama. We show up on time, clean with care, and
                leave your space spotless.
            </p>

            <div class="button-row justify-start">
                <a
                    href="{resolve('/(portfolio)/contact')}?mode=quote"
                    class="button-attention fly-in animate-delay-700 animate-duration-500"
                >
                    Get a Quote <Icon icon="Arrows/TopRight" />
                </a>
                <button
                    onclick={() =>
                        document
                            .getElementById("learn-more-marker")
                            ?.scrollIntoView({ behavior: "smooth" })}
                    class="button-primary fly-in animate-delay-800 animate-duration-500"
                    >Learn More</button
                >
            </div>
        </div>

        <div class="fly-in animate-delay-900 animate-duration-800">
            <ComparableImage
                before={comparisonImage.before}
                after={comparisonImage.after}
                class="aspect-3/2 rounded-container"
            />
        </div>
    </div>

    <ActionStack />
</div>
