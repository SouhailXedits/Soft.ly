// import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// type LineChartCompProps = {
//   data: {
//     name: string;
//     value: number;
//     avg: number 
//   }[];
// };

// const LineChartComp = ({data}:LineChartCompProps) => {
//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <LineChart
//         width={730}
//         height={250}
//         data={data}
//         margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//       >
//         <CartesianGrid strokeDasharray="3 4" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="basis" dataKey="value" stroke="#8884d8" />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }

// export default LineChartComp;