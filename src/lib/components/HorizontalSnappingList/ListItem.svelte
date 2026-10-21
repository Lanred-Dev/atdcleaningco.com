<script lang="ts">
    import { getHorizontalSnappingListContext } from "./HorizontalSnappingListContext.ts";
    import { onMount, type Snippet } from "svelte";
    import { Spring } from "svelte/motion";

    type AnimationStateId =
        | "Podium"
        | "Previous"
        | "Next"
        | "EnteringPrevious"
        | "ExitingPrevious"
        | "EnteringNext"
        | "ExitingNext";
    type AnimationState = {
        left: number;
        x: number;
        scale: number;
        rotate: number;
        opacity: number;
    };

    let {
        children,
        animationStates = {
            Podium: { left: 50, x: -50, scale: 1, rotate: 0, opacity: 1 },
            Previous: { left: 10, x: -100, scale: 0.9, rotate: -3, opacity: 0.5 },
            Next: { left: 90, x: 0, scale: 0.9, rotate: 3, opacity: 0.5 },
            EnteringPrevious: { left: 0, x: -100, scale: 0.85, rotate: -6, opacity: 0.3 },
            ExitingPrevious: { left: 0, x: -100, scale: 0.85, rotate: -6, opacity: 0 },
            EnteringNext: { left: 100, x: 0, scale: 0.85, rotate: 6, opacity: 0.3 },
            ExitingNext: { left: 100, x: 0, scale: 0.85, rotate: 6, opacity: 0 },
        },
    }: {
        children: Snippet;
        animationStates?: Record<AnimationStateId, AnimationState>;
    } = $props();

    const HorizontalSnappingListContext = getHorizontalSnappingListContext();
    let ListItem: HTMLElement;
    let myIndex = $state.raw<number>(0);
    // 0 = center, -1 = previous, 1 = next, undefined = not visible
    let previousPosition: number | undefined = undefined;
    let currentPosition: number | undefined = undefined;
    // `animationStates.Podium` only capturing the initial state is intended.
    // svelte-ignore state_referenced_locally
    let animationSpring = new Spring<AnimationState>(animationStates.Podium, {
        stiffness: 0.05,
        damping: 0.35,
    });

    function updatePosition() {
        previousPosition = currentPosition;

        const currentItemIndex: number = HorizontalSnappingListContext.currentItemIndex;
        const itemCount: number = HorizontalSnappingListContext.itemCount;

        if (myIndex === currentItemIndex) {
            currentPosition = 0;
        } else if (myIndex === (currentItemIndex - 1 + itemCount) % itemCount) {
            currentPosition = -1;
        } else if (myIndex === (currentItemIndex + 1) % itemCount) {
            currentPosition = 1;
        } else {
            currentPosition = undefined;
        }
    }

    function updateAnimationState() {
        switch (currentPosition) {
            case 0:
                animationSpring.set(animationStates.Podium);
                break;
            case -1:
                if (previousPosition !== 0 && previousPosition !== -1)
                    animationSpring.set(animationStates.EnteringPrevious, { instant: true });

                animationSpring.set(animationStates.Previous);
                break;
            case 1:
                if (previousPosition !== 0)
                    animationSpring.set(animationStates.EnteringNext, { instant: true });

                animationSpring.set(animationStates.Next);
                break;
            case undefined:
                if (previousPosition === -1) animationSpring.set(animationStates.ExitingPrevious);
                else if (previousPosition === 1) animationSpring.set(animationStates.ExitingNext);
                break;
        }
    }

    onMount(() => {
        myIndex = HorizontalSnappingListContext.registerItem(ListItem);

        updatePosition();
        updateAnimationState();
    });

    $effect(() => {
        updatePosition();
        updateAnimationState();
    });
</script>

<li
    class="absolute top-1/2 aspect-4.5/2 h-full max-w-[90dvw] transform-gpu md:aspect-6/2 lg:aspect-8/2"
    style:left="{animationSpring.current.left}%"
    style:transform={`translateX(${animationSpring.current.x}%) translateY(-50%) scale(${animationSpring.current.scale}) rotate(${animationSpring.current.rotate}deg)`}
    style:opacity={animationSpring.current.opacity}
    style:display={animationSpring.current.opacity === 0 ? "none" : "block"}
    bind:this={ListItem}
    onmouseenter={() => HorizontalSnappingListContext.pauseAutoScroll()}
    onmouseleave={() => HorizontalSnappingListContext.resumeAutoScroll()}
>
    {@render children()}
</li>
