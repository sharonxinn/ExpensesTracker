import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { Category } from "../../types";
import { CATEGORY_COLOURS } from "../../utils/categoryColours";
import { formatRM } from "../../utils/currency";

interface CategoryPieChartProps {
  data: { category: Category; total: number }[];
}

export default function CategoryPieChart({ data }: CategoryPieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="total"
          nameKey="category"
          cx="50%"
          cy="45%"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={3}
          label={false}
        >
          {data.map(({ category }) => (
            <Cell key={category} fill={CATEGORY_COLOURS[category]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => formatRM(value)} />
        <Legend
          iconType="circle"
          iconSize={10}
          formatter={(value) => (
            <span style={{ fontSize: "0.8rem", color: "#374151" }}>{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
