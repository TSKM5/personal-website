import './../../css/components/action-components/user-input-suggestions.css'
import { useEffect, useState } from "react";

export default function UserInputSuggestions(props: { 
    activeValue: string, 
    suggestions: string[], 
    setInputValue: (val: string) => void, 
    inputElement: HTMLInputElement | null, 
    currentFocus: number | null, 
}) {
    const { activeValue, suggestions, setInputValue, inputElement, currentFocus } = props;
    const [position, setPosition] = useState<{ top: string, left: string, width:string }>({ top: '', left: '', width: '', });
    const [returnedSuggestions, setReturnedSuggestions] = useState<string[]>([]);

    useEffect(() => {
        if (inputElement) {
            const rect = inputElement.getBoundingClientRect();
            setPosition({
                top: (rect.bottom + window.scrollY).toString() + 'px',
                left: (rect.left + window.scrollX).toString() + 'px',
                width: (rect.width).toString() + 'px',
            });
        }
    }, [inputElement]);

    useEffect(() => {
        if (activeValue) {
            const matchedOptions = suggestions.filter(option =>
                option.toLowerCase().includes(activeValue.toLowerCase())
            );
            setReturnedSuggestions(matchedOptions);
        } else {
            setReturnedSuggestions([]);
        }
    }, [activeValue]);

    return (
        <div className="filter-manager-suggestions-container" style={{...position}}>
            {returnedSuggestions.map((suggestion, index) => (
                <SuggestionsReturnOption key={index} text={suggestion} valueCallback={setInputValue} isFocused={index === currentFocus}/> 
            ))}
        </div>
    )
}

function SuggestionsReturnOption(props:{
    text:string, 
    valueCallback:(val:string) => void, 
    isFocused:boolean, 
}) {

    const {text, valueCallback, isFocused} = props; 
    const [focus, setFocus] = useState(isFocused); 

    useEffect(() => {
        setFocus(isFocused);
    }, [isFocused])
    return (
        <div className={`suggestions-return-option-container ${focus ? 'suggestions-return-option-container-focus' : ''}`} onClick={() => valueCallback(text)}>
            <p className='suggestions-return-option-text'>{text}</p>
        </div>
    )
}