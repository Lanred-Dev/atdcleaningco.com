<script lang="ts">
    import type { ClassValue } from "svelte/elements";
    import { Spring } from "svelte/motion";
    import Icon from "#lib/components/Icon.svelte";
    import { onMount } from "svelte";

    let {
        before,
        after,
        class: className,
        idleBounceNudge = 3,
    }: {
        before: string;
        after: string;
        class?: ClassValue;
        idleBounceNudge?: number;
    } = $props();

    let sliderPercentage: Spring<number> = new Spring(50, {
        stiffness: 0.05,
        damping: 0.15,
    });
    let isDragging: boolean = $state.raw(false);
    let idleBounceTimeout: ReturnType<typeof setTimeout> | null = null;
    let Wrapper: HTMLElement;

    function updateSliderPercentage(pointerDeviceX: number) {
        if (idleBounceTimeout) {
            clearTimeout(idleBounceTimeout);
            idleBounceTimeout = null;
        }

        const boundingRect = Wrapper.getBoundingClientRect();
        const x = pointerDeviceX - boundingRect.left;
        sliderPercentage.set(Math.max(8, Math.min(92, (x / boundingRect.width) * 100)), {
            instant: true,
        });
    }

    function startIdleBounce() {
        if (idleBounceTimeout) clearTimeout(idleBounceTimeout);

        idleBounceTimeout = setTimeout(() => {
            let oldTarget: number = sliderPercentage.target;
            let newTarget: number =
                oldTarget + (Math.random() > 0.5 ? idleBounceNudge : -idleBounceNudge);

            if (newTarget < 5) newTarget = oldTarget + idleBounceNudge;
            else if (newTarget > 95) newTarget = oldTarget - idleBounceNudge;

            sliderPercentage.target = newTarget;
            idleBounceTimeout = setTimeout(() => {
                sliderPercentage.target = oldTarget;
                idleBounceTimeout = setTimeout(startIdleBounce, 500);
            }, 1000);
        }, 5000);
    }

    onMount(() => {
        startIdleBounce();
    });
</script>

<svelte:window
    onmouseup={() => (isDragging = false)}
    ontouchend={() => (isDragging = false)}
    onmousemove={(event) => {
        if (!isDragging) return;

        updateSliderPercentage(event.clientX);
    }}
    on:touchmove|nonpassive={(event) => {
        if (!isDragging) return;

        event.preventDefault();
        updateSliderPercentage(event.touches[0].clientX);
    }}
/>

<div class="relative select-none" bind:this={Wrapper}>
    <div class={["relative h-full w-full overflow-hidden", className]}>
        {#snippet Image(isBefore: boolean)}
            <div
                class={["h-full w-full overflow-hidden", isBefore && "absolute top-0 left-0"]}
                style:clip-path="inset(0 {isBefore ? 100 - sliderPercentage.current : 0} 0 {!isBefore
                    ? sliderPercentage.current
                    : 0}%)"
            >
                <img
                    src={isBefore ? before : after}
                    alt={isBefore ? "Before" : "After"}
                    class="h-full w-full object-cover"
                />

                <p
                    class={[
                        "absolute top-8 font-semibold text-white mix-blend-difference",
                        isBefore ? " left-1/3" : "right-1/3",
                    ]}
                >
                    {isBefore ? "Before" : "After"}
                </p>
            </div>
        {/snippet}

        {@render Image(true)}
        {@render Image(false)}
    </div>

    <div
        class="y-center z-10 h-full w-0.5 -translate-x-1/2 bg-attention"
        style:left="{sliderPercentage.current}%"
    >
        <button
            class="button-attention icon y-center x-center shadow-lg"
            onmousedown={() => (isDragging = true)}
            ontouchstart={() => (isDragging = true)}
        >
            <Icon icon="Arrows/LeftRight" class="rotate-90 text-bright" />
        </button>
    </div>
</div>
