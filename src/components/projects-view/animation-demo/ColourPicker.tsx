import './../../../css/components/projects-view/animation-demo/colour-picker.css'
import { ColorResult, SketchPicker } from 'react-color';
import Button from '../../action-components/Button';
import { useEffect, useState } from 'react';


export function ColourPicker(props: {intitialColourHexVal:string, colourValue: string, setColour: (colour: string) => void}) {
    const {intitialColourHexVal, colourValue, setColour} = props;
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [buttonColour, setButtonColour] = useState<string>(intitialColourHexVal);

    const handleColourChange = (e: ColorResult) => {
        setColour(`rgba(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a})`)
        setButtonColour(e.hex);
    }

    useEffect(() => {
        if (showPicker) {
            const handleDocumentClick = (e: MouseEvent) => {
                const pickerElement = document.querySelector('.colour-picker-widget-container');
                if (pickerElement && !pickerElement.contains(e.target as Node)) {
                    setShowPicker(false);
                }
            };
    
            document.addEventListener('mousedown', handleDocumentClick);
    
            return () => {
                document.removeEventListener('mousedown', handleDocumentClick);
            };
        }
    }, [showPicker]);
    

    return (
        <>
            <Button text={buttonColour} style={{backgroundColor:buttonColour}} callback={ () => setShowPicker(!showPicker)}/>
            {   
                showPicker && (
                    <div className='colour-picker-widget-container'>
                        <SketchPicker color={colourValue} onChange={(e) => handleColourChange(e)}/> 
                    </div> 
                )
            }
           
        </>
    )
}