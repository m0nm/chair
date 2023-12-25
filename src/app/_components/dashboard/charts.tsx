"use client";
import { SquareIcon } from "lucide-react";
import { useParams } from "next/navigation";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Cell,
  LegendProps,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  LineChart,
  CartesianGrid,
  Line,
} from "recharts";

const donutChartData = [
  { className: "fill-green-500", name: "Other Source", value: 62 },
  { className: "fill-blue-500", name: "Direct Link", value: 88 },
  { className: "fill-red-500", name: "Referral Link", value: 135 },
  { className: "fill-indigo-500", name: "Paid Ads", value: 252 },
  { className: "fill-yellow-500", name: "Search Engine", value: 925 },
];

const renderLegend = (props: LegendProps) => {
  const { payload } = props;

  return (
    <ul className="flex min-h-fit flex-wrap content-start items-start justify-start gap-x-3 gap-y-2 px-2 text-center font-semibold">
      {payload?.map((item, i) => (
        <li
          key={`legend-item-${i}`}
          className="flex flex-1 items-center gap-0.5 whitespace-nowrap text-xs"
        >
          <SquareIcon
            className={donutChartData[i].className}
            stroke="transparent"
          />
          {item.value}
        </li>
      ))}
    </ul>
  );
};

export const TraficDonutChart = () => {
  return (
    <ResponsiveContainer width="100%" height={"100%"}>
      <PieChart>
        <Pie
          data={donutChartData}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={"60%"}
          outerRadius={"100%"}
        >
          {donutChartData.map((item, i) => (
            <Cell key={`cell-${i}`} className={item.className} />
          ))}
        </Pie>
        {/* @ts-ignore */}
        <Legend content={renderLegend} verticalAlign="bottom" />
        <Tooltip wrapperClassName="!p-2 rounded-2xl !text-xs !font-medium" />
      </PieChart>
    </ResponsiveContainer>
  );
};

const barData = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

export const MonthlySalesBarChart = () => {
  const { lang } = useParams();

  return (
    <ResponsiveContainer width="100%" height={"100%"}>
      <BarChart data={barData} height={350}>
        <Tooltip
          cursor={false}
          wrapperClassName="!bg-foreground/30 !rounded !text-background"
        />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          className="!left-8"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          barSize={20}
          dataKey="total"
          activeBar={false}
          className="fill-primary"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

const lineChartData = [
  {
    name: "Sun",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mon",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Tue",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Wed",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Thu",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Fri",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Sat",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
];

export const RevenuLineChart = () => {
  const { lang } = useParams();

  return (
    <ResponsiveContainer width="100%" height={"100%"}>
      <LineChart
        data={lineChartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" className="text-xs md:text-sm" />
        <YAxis
          orientation={lang == "ar" ? "right" : "left"}
          className="text-xs md:text-sm"
          label={{
            value: "Daily Sales",
            angle: -90,
            position: "insideLeft",
            offset: lang == "ar" ? 20 : -8,
          }}
        />
        <Tooltip />
        <Legend fontSize={10} />
        <Line
          name="previous week"
          legendType="square"
          type="monotone"
          dataKey="pv"
          stroke="#22c55e"
          strokeWidth={4}
        />
        <Line
          name="current week"
          legendType="square"
          type="monotone"
          dataKey="uv"
          stroke="#3b82f6"
          strokeWidth={4}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
