import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { BarChartCompProps } from "../../../types";


const BarChartComp = ({data}:BarChartCompProps) => {
  const modifiedData = data.map((item) => ({
    ...item,
    name: item.name.trim() === "" ? "others" : item.name,
  }));
  return (
    <BarChart width={730} height={250} data={modifiedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      {/* <Legend /> */}
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
}

export default BarChartComp;