
"use client";

import { BarChart as RechartsBarChartComponent, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

interface TeamPerformanceChartProps {
  chartData: Array<{
    name: string;
    xg: number;
    shots: number;
    possession: number;
  }>;
  chartConfig: ChartConfig;
}

export function TeamPerformanceChart({ chartData, chartConfig }: TeamPerformanceChartProps) {
  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <RechartsBarChartComponent data={chartData} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="xg" fill="var(--color-xg)" radius={4} />
        <Bar dataKey="shots" fill="var(--color-shots)" radius={4} />
        <Bar dataKey="possession" fill="var(--color-possession)" radius={4} />
      </RechartsBarChartComponent>
    </ChartContainer>
  );
}
