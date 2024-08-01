import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Client } from "@gradio/client";
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  Minimum_Demand: {
    label: "Minimum Demand",
    color: "hsl(var(--chart-1))",
  },
  Maximum_Demand: {
    label: "Maximum Demand",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface DemandForecastResult {
  product_name: string;
  predicted_quantity: number;
  minimum_demand: number;
  maximum_demand: number;
}

export default function InAreaChartDash() {
  const [chartData, setChartData] = React.useState<DemandForecastResult[]>([]);
  const [timeRange, setTimeRange] = React.useState("30");
  const [load, setLoad] = React.useState(false);

  React.useEffect(() => {
    const fetchDemand = async () => {
      setLoad(true);
      try {
        const client = await Client.connect("YashwanthSC/Demanda");
        const result = await client.predict("/predict", { days: parseInt(timeRange, 10) });

        // Directly use the fetched data
        const dataArray = Array.isArray(result.data[0]) ? result.data[0] : Object.values(result.data[0]);

        setChartData(dataArray);
        console.log("dataArray", dataArray[0]); 
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoad(false);
      }
    };

    fetchDemand();
  }, [timeRange]);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Demand Forecasting</CardTitle>
          <CardDescription>
            Showing demand forecast for the selected time range
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Next 30 days" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="30" className="rounded-lg">
              Next 30 days
            </SelectItem>
            <SelectItem value="25" className="rounded-lg">
              Next 25 days
            </SelectItem>
            <SelectItem value="20" className="rounded-lg">
              Next 20 days
            </SelectItem>
            <SelectItem value="15" className="rounded-lg">
              Next 15 days
            </SelectItem>
            <SelectItem value="10" className="rounded-lg">
              Next 10 days
            </SelectItem>
            <SelectItem value="7" className="rounded-lg">
              Next 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {load ? (
          <div className="h-full w-full flex justify-center items-center">
            Can you feel my AI?
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[300px] w-full"
          >
            <AreaChart data={chartData} margin={{ right: 30, bottom: 50, left: 30 }}>
              <defs>
                <linearGradient id="fillMinimum" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B0B0B0" stopOpacity={0.8} /> {/* Grey color */}
                  <stop offset="95%" stopColor="#B0B0B0" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillMaximum" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.8} /> {/* White color */}
                  <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="product_name"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10,
                  angle: -45,  // Rotate labels
                  textAnchor: 'end',  // Align text to end of the tick line
                  dy: 10,  // Adjust vertical position
                }}
                interval={0}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => value}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="maximum_demand"
                type="natural"
                fill="url(#fillMinimum)"
                stroke="#B0B0B0" 
                stackId="a"
              />
              <Area
                dataKey="minimum_demand"
                type="natural"
                fill="url(#fillMaximum)"
                stroke="#FFFFFF"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
