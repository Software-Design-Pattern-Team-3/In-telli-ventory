// PieChartDash.tsx
import { Client } from "@gradio/client";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Label, Pie, PieChart } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

interface SentimentAnalysisResult {
  total_reviews:number;
  negative_percentage: number;
  positive_percentage: number;
  products_by_category: ProductsByCategory;
}

interface ProductsByCategory {
  negative: string[];
  positive: string[];
}

export function PieChartDash() {
    const [chartData, setChartData] = useState<{ name: string; value: number; fill: string }[]>([]);
    const [totalVisitors, setTotalVisitors] = useState(0);
    const [pred,setPred] = useState(0);
    useEffect(() => {
        const fetchSenti = async () => {

            const client = await Client.connect("YashwanthSC/Sentina");
            const result = await client.predict("/sentiment_analysis", {});


            const data = (result.data as unknown[])[0] as SentimentAnalysisResult;

            const processedData = [
                { name: "Positive", value: data.positive_percentage, fill: "hsl(var(--chart-1))" },
                { name: "Negative", value: data.negative_percentage, fill: "hsl(var(--chart-5))" },
            ];

            setChartData(processedData);
            setTotalVisitors(data.total_reviews);
            setPred((data.positive_percentage * 10/100))
        };

        fetchSenti();
    }, []);

    const chartConfig: ChartConfig = {
        visitors: {
            label: "Visitors",
        },
        Positive: {
            label: "Positive",
            color: "hsl(var(--chart-1))",
        },
        Negative: {
            label: "Negative",
            color: "hsl(var(--chart-5))",
        },
    };

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Sentiment Analysis</CardTitle>
                <CardDescription>July - November 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Reviews
                                                </tspan>
                                            </text>
                                        );
                                    }
                                    return null;
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    About {pred} of 10 people love your product <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Analysis of users sentiments after using your products
                </div>
            </CardFooter>
        </Card>
    );
}
