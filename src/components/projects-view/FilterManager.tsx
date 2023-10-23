import './../../css/components/projects-view/filter-manager.css';
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import Button from "../action-components/Button";
import UserInput from "../action-components/UserInput";
import UserInputSuggestions from '../action-components/UserInputSuggestions';
import FilterOption from './FilterOption';


export default function FilterManager(props:{filters:string[], setFilteredTags:(val:string[]) => void}) {
    const { filters, setFilteredTags } = props;
    const [inputValue, setInputValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [activeFilter, setActiveFilter] = useState<string[]>([]);
    const inactiveOptionsRef = useRef<string[]>(filters);
    const [viewUnusedFilters, setViewUnusedFilters] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [currentFocus, setCurrentFocus] = useState<number | null>(null);

    useEffect(() => {
        inactiveOptionsRef.current = filters.filter(filter => !activeFilter.includes(filter));
    }, [filters, activeFilter]);

    useEffect(() => {
        setFilteredTags(activeFilter);
    }, [activeFilter]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);

        if (value) {
            const matchedOptions = filters.filter(option =>
                option.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(matchedOptions);
        } else {
            setSuggestions([]);
        }
    };

    const handleAddFilter = (val: string) => {
        if (!activeFilter.includes(val)) {
            setActiveFilter(prev => [...prev, val]);
            inactiveOptionsRef.current = inactiveOptionsRef.current.filter(inactive => inactive !== val);
        }
        setInputValue('');
    }

    const handleRemoveFilter = (val: string) => {
        setActiveFilter(prev => prev.filter(active => active !== val));
        inactiveOptionsRef.current.push(val);
    }

    const handleViewTagsClick = () => {
        setViewUnusedFilters(prev => !prev);
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (suggestions.length === 0) return;
        if (e.key === "ArrowDown") {
            setCurrentFocus((prev) => (prev === null || prev >= suggestions.length - 1) ? 0 : prev + 1);
            e.preventDefault();
        } else if (e.key === "ArrowUp") {
            setCurrentFocus((prev) => (prev === null || prev <= 0) ? suggestions.length - 1 : prev - 1);
            e.preventDefault();
        } else if (e.key === "Enter") {
            if(currentFocus || currentFocus === 0){
                if(activeFilter.findIndex(val => val === suggestions[currentFocus]) === -1) {
                    handleAddFilter(suggestions[currentFocus]); 
                }
            }
            setInputValue(''); 
        }
    }

    return (
        <div className="filter-manager-container">
            <div className="filter-manager-input-container">
                <Button text={viewUnusedFilters ? "Hide Tags" :"Show Tags"} callback={handleViewTagsClick} />
                <UserInput 
                    ref={inputRef}
                    placeHolderText={"Search Tags"} 
                    type={"text"} 
                    changeHandlerCallback={handleChange} 
                    value={inputValue}
                    onKeyDown={handleKeyDown}
                />
                {
                    inputValue.length > 0 && (
                        <UserInputSuggestions suggestions={filters} setInputValue={handleAddFilter} inputElement={inputRef.current} activeValue={inputValue} currentFocus={currentFocus}/> 
                    )
                }
            </div>
            <div className='filter-tag-display'> 
                <div className="filter-tag-display-inactive-container">
                    {viewUnusedFilters && (
                        inactiveOptionsRef.current.map((tag, index) => (
                            <FilterOption key={index} text={tag} handleclick={handleAddFilter} isActive={false}/>
                        ))
                    )}
                </div>
                <div className="filter-tag-display-active-container">
                    {
                        activeFilter.map((tag, index) => (
                            <FilterOption key={index} text={tag} handleclick={handleRemoveFilter} isActive={true}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
