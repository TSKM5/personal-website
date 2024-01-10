import './../../css/components/charts/multiple-chart-container.css'
import { useEffect, useState } from "react";
import BarChartDisplay from "./BarChartDisplay";
import PieChartDisplay from "./PieChartDisplay";
import Button from "../action-components/Button";
import { getDimensionsByClassName } from '../../utils/helperFunctions';
import { ChartData, Dimensions } from '../../utils/types/GeneralTypes';


export default function MultipleChartContainer(props:{chartData:ChartData[], startWithBar:boolean, barTicks?:number, matchClassForDimensions?:string}) {
    const { chartData, startWithBar, barTicks, matchClassForDimensions} = props; 
    const [isBarChart, setIsBarChart] = useState<boolean>(startWithBar);
    const [isBarHorizontal, setIsBarHorizontal] = useState<boolean>(false); 
    const [barChartDimensions, setBarChartDimensions] = useState<Dimensions>({width:0, height:0}); 
    const changeChartText:string = isBarChart ? 'Pie Chart' : 'Bar Chart'; 
    const changeBarOrientationText:string = isBarHorizontal ? 'Vertical Bar' : 'Horizontal Bar'; 

    useEffect(() => {
        if(matchClassForDimensions){
            const dimensions = getDimensionsByClassName(matchClassForDimensions);
            if (dimensions) {
                setBarChartDimensions(dimensions);
            }
        } else {
            setBarChartDimensions({
                width: 1030,
                height: 250,
            });
        }
      }, []);

    return (
        <div className="multiple-chart-container"> 
            {
                isBarChart && (
                    <BarChartDisplay isHorizontal={isBarHorizontal} chartData={chartData} numOfTicks={barTicks} dimensions={barChartDimensions}/> 
                )
            }
            {
                !isBarChart && (
                    <PieChartDisplay chartData={chartData}/> 
                )
            }
            <div className="multiple-chart-button-container">
                <Button text={changeChartText} callback={() => setIsBarChart(!isBarChart)}/> 
                {
                    isBarChart && (
                        <Button text={changeBarOrientationText} callback={() => setIsBarHorizontal(!isBarHorizontal)}/> 
                    )
                }
            </div>
        </div>
    )
}