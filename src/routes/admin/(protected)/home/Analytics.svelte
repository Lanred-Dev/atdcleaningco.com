<script lang="ts">
    import { BarChart, defaultChartPadding } from "layerchart";
    import type { PageServerData } from "./$types";
    import { scaleBand } from "d3-scale";

    let {
        analytics,
        sources,
    }: { analytics: PageServerData["analytics"]; sources: PageServerData["sources"] } = $props();
</script>

<section class="mb-8">
    <div class="section-title">
        <h2 class="title">Traffic Analytics</h2>
        <p class="subtitle">A quick overview of the website's traffic over the past month.</p>
    </div>

    <div class="relative">
        {#if analytics.length === 0}
            <p class="y-center x-center">No analytics data available.</p>
        {/if}

        <BarChart
            data={analytics.length > 0 ? analytics : [{ date: "No data" }]}
            x="date"
            xScale={scaleBand().padding(0.2)}
            series={sources.length > 0
                ? sources.map((source) => ({
                      key: source,
                  }))
                : [{ key: "unknown" }]}
            seriesLayout="group"
            padding={defaultChartPadding({ left: 35, top: 25, right: 25, bottom: 35 })}
            height={300}
        />
    </div>
</section>
