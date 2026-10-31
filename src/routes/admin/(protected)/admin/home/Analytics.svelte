<script lang="ts">
    import { BarChart } from "layerchart";
    import type { PageServerData } from "./$types";
    import { scaleBand } from "d3-scale";

    let {
        trafficSources,
        marketingCampaigns,
    }: {
        trafficSources: PageServerData["trafficSources"];
        marketingCampaigns: PageServerData["marketingCampaigns"];
    } = $props();
</script>

<section>
    <div class="section-title">
        <h2 class="title">Analytics</h2>
        <p class="subtitle">A quick overview of the website's traffic and where its from.</p>
    </div>

    <div class="relative">
        {#if trafficSources.length === 0}
            <p class="y-center x-center w-full text-center">No analytics data available.</p>
        {/if}

        <BarChart
            data={trafficSources.length > 0 ? trafficSources : [{ date: "No data" }]}
            x="date"
            xScale={scaleBand().padding(0.2)}
            series={marketingCampaigns.map(({ id, name, displayColor }) => {
                return {
                    key: name,
                    value: id,
                    color: displayColor,
                };
            })}
            seriesLayout="stack"
            props={{
                yAxis: { format: "integer" },
            }}
            height={300}
            legend
        />
    </div>
</section>
