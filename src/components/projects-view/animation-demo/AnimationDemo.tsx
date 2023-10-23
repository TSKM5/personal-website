import { useState } from "react";
import Button from "../../action-components/Button";
import './../../../css/components/projects-view/animation-demo/animation-demo.css'
import { EyeBackground, StarryBackground, ZigZagBackground } from "react-animated-background-lib";
import { ColourPicker } from "./ColourPicker";

const DEFAULT_BACKGROUND_COLOUR = '#ffffff';
export function AnimationDemo() {
    const [animationJsx, setAnimationJsx] = useState<JSX.Element[]>([
        <StarryBackground numberOfStars={50} />,
        <EyeBackground /> ,
        <ZigZagBackground numberOfCircles={20} /> 
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [backgroundColour, setBackgroundColour] = useState<string>(DEFAULT_BACKGROUND_COLOUR);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? animationJsx.length - 1 : prevIndex - 1));
      };
    
      const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === animationJsx.length - 1 ? 0 : prevIndex + 1));
      };

    return (
        <div className="animation-demo-container"> 
            <div className="animation-demo-render" style={{backgroundColor: backgroundColour}}>
                {
                    animationJsx[currentIndex] 
                }
            </div>
            <ColourPicker intitialColourHexVal={DEFAULT_BACKGROUND_COLOUR} colourValue={backgroundColour} setColour={setBackgroundColour}/> 
            <div className='animation-tracker-container'>
                {
                    Array.from({ length: animationJsx.length }).map((i, index) => (
                        <div className={`animation-tracker-${currentIndex === index ? 'selected' : 'unselected'}`} key={index} />
                    ))
                }
            </div>
            <div className="animation-demo-controls">
                <Button text='Back' callback={handlePrevious}/>
                <Button text='Next' callback={handleNext}/>
            </div>
        </div>
    )
}