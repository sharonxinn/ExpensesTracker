import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { formatRM } from "../../utils/currency";

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface MonthlyBarChartProps {
  data: { month: number; total: number }[];
  year: number;
}

export default function MonthlyBarChart({ data, year }: MonthlyBarChartProps) {
  const chartData = data.map(({ month, total }) => ({
    name: MONTH_LABELS[month - 1],
    total,
  }));

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={chartData} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: "#6b7280" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v: number) => (v === 0 ? "0" : `RM ${v}`)}
          tick={{ fontSize: 11, fill: "#6b7280" }}
          axisLine={false}
          tickLine={false}
          width={72}
        />
        <Tooltip
          formatter={(value: number) => [formatRM(value), "Total"]}
          cursor={{ fill: "#f3f4f6" }}
        />
        <Bar dataKey="total" radius={[4, 4, 0, 0]}>
          {chartData.map((_, index) => {
            const isCurrentMonth = index + 1 === currentMonth && year === currentYear;
            return (
              <Cell
                key={index}
                fill={isCurrentMonth ? "#4f46e5" : "#a5b4fc"}
              />
            );
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
