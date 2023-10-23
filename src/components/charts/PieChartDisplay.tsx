import { PieChart, Pie, Tooltip, Cell, LabelList, Legend } from "recharts";
import { ChartData } from "../../utils/types/ChartData";

export default function PieChartDisplay(props:{chartData:ChartData[], colours?:string[]}) {
    const { chartData, colours } = props;
    
    const style: React.CSSProperties | undefined = undefined;
    const COLOURS:string[] = colours? colours: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#5DADE2', '#45B39D', '#D4AC0D'];

    const sizeWandH: number = 250; 


    //non prop
    const radius = (sizeWandH - 100) / 2; 

    return (
        <div style={style}> 
            <PieChart width={sizeWandH} height={sizeWandH}>
                <Tooltip />
                <Legend />
                <Pie 
                    data={chartData} 
                    dataKey="val" 
                    nameKey="name" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={radius} 
                    fill="#000000"
                >
                    {
                        chartData.map((entry, index) => <Cell key={index} fill={COLOURS[index % COLOURS.length]} />)
                    }
                </Pie>
            </PieChart>
        </div>
    )
}
