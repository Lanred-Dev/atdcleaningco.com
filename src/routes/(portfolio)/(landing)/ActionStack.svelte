<script lang="ts">
    import Icon from "#lib/components/Icon.svelte";
</script>

{#snippet ActionItem(icon: string, text: string, index: number)}
    {@const animationDelay: number = 1000 + index * 300}
    <div class="flex-center gap-1">
        <Icon
            {icon}
            class="size-8 text-attention fly-in animate-duration-500"
            style="animation-delay: {animationDelay}ms"
        />
        <p
            class="text-center text-lg font-semibold text-nowrap text-attention fly-in animate-duration-500"
            style:animation-delay="{animationDelay + 150}ms"
        >
            {text}
        </p>
    </div>
{/snippet}

<div class="flex-center w-full flex-wrap gap-5 bg-dark px-8 py-6 md:gap-8 lg:gap-14">
    {@render ActionItem("UserGroup", "Trustworthy Team", 1)}
    {@render ActionItem("Calendar", "Flexible scheduling", 2)}
    {@render ActionItem("CheckBadge", "Satisfaction focused", 3)}
</div>
