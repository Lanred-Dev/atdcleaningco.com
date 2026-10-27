<!-- This component is a fork of https://github.com/rharkor/check-mark-animation but has been replaced with an X -->

<script lang="ts">
    import type { SVGAttributes } from "svelte/elements";

    let { class: className, ...properties }: SVGAttributes<SVGSVGElement> = $props();
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 144 144"
    class={["overflow-visible text-attention", className]}
    {...properties}
>
    <circle class="semi-transparent" fill="currentColor" opacity="0.15" cx="72" cy="72" r="72" />
    <circle class="colored" fill="currentColor" cx="72" cy="72" r="72" opacity="0.8" />

    <g stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <path d="M48 48 L96 96" pathLength="1" stroke-dasharray="1" stroke-dashoffset="0" />
        <path d="M96 48 L48 96" pathLength="1" stroke-dasharray="1" stroke-dashoffset="0" />
    </g>
</svg>

<style>
    @keyframes path {
        0% {
            stroke-dashoffset: 1;
        }

        100% {
            stroke-dashoffset: 0;
        }
    }

    svg path {
        animation: path 0.5s ease-in-out 0.7s backwards;
    }

    @keyframes grow-circle {
        0% {
            r: 0;
        }
    }

    @keyframes grow-circle-bigger {
        50% {
            opacity: 0.11;
        }
        100% {
            r: 100;
            opacity: 0;
        }
    }

    svg circle.semi-transparent {
        animation:
            grow-circle 0.45s cubic-bezier(0.66, 0.23, 0.51, 1.23) backwards,
            grow-circle-bigger 0.9s linear 1.1s forwards;
    }

    svg circle.colored {
        animation: grow-circle 0.5s cubic-bezier(0.66, 0.23, 0.51, 1.23) 0.25s backwards;
    }
</style>
