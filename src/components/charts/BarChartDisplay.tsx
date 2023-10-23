import React from "react";
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, Cell, XAxisProps, YAxisProps } from "recharts";
import { ChartData } from "../../utils/types/ChartData";
import { Dimensions } from "../../utils/types/GeneralTypes";

export default function BarChartDisplay(props:{
  isHorizontal:boolean, 
  chartData:ChartData[], 
  numOfTicks?:number, 
  colours?:string[],
  dimensions:Dimensions, 
}) {
  const { isHorizontal, chartData, numOfTicks, colours, dimensions } = props;
  
  const style: React.CSSProperties | undefined = undefined;
  const COLOURS:string[] = colours? colours: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#5DADE2', '#45B39D', '#D4AC0D'];

  const barChartProps = {
    width: dimensions.width,
    height: 250,
    data: chartData
  };
  const getMaxValue = (data: ChartData[]) => Math.max(...data.map(item => item.val));
  
  const determineTicks = (data:ChartData[]) => {
    const ticks: number = numOfTicks ? numOfTicks : 10; 
    const maxValue = getMaxValue(data);
    const interval = Math.ceil(maxValue / ticks);
    return Array.from({ length: ticks + 1 }, (_, index) => index * interval);
  };

  const xAxisProps: XAxisProps = isHorizontal
    ? { dataKey: "val", type: "number", ticks: determineTicks(chartData), allowDecimals: false,}
    : { dataKey: "name" };

  const yAxisProps: YAxisProps = isHorizontal
    ? { dataKey: "name", type: "category", width: 150 }
    : { dataKey: "val", ticks: determineTicks(chartData) };

  return (
    <div style={style}>
      <BarChart {...barChartProps} layout={isHorizontal ? "vertical" : "horizontal"}>
        <XAxis {...xAxisProps} />
        <YAxis {...yAxisProps} />
        <Tooltip />
        <Bar dataKey="val">
          {
            chartData.map((entry, index) => <Cell key={index} fill={COLOURS[index % COLOURS.length]} />)
          }
        </Bar>
      </BarChart>
    </div>
  );
}
