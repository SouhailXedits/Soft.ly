import { Cell, Pie, PieChart, Legend, Tooltip, ResponsiveContainer } from "recharts";

type PieChartCompProps = {
  data: {
    name: string;
    value: number;
    id: number;
    color: string
  }[];
};

const PieChartComp = ({data}:PieChartCompProps) => {
  return (
    <ResponsiveContainer width='100%' height={240}>
      <PieChart width={730} height={250}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={3}
          label
        >
          {data.map((entry) => (
            <Cell fill={entry.color} key={entry.value} stroke={entry.color}/>
          ))}
        </Pie>
        <Tooltip />
        <Legend
          verticalAlign="middle"
          align="right"
          width={30}
          layout="vertical"
          iconSize={15}
          iconType="circle"
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieChartComp;