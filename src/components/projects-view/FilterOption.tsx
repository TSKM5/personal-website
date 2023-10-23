import './../../css/components/projects-view/filter-option.css'; 

export default function FilterOption(props:{text:string, handleclick:(val:string) => void, isActive:boolean}) {
    const { text, handleclick, isActive } = props; 
    const className = isActive ? 'filter-active-option-container' : 'filter-inactive-option-container';
    return (
        <div className={className} onClick={() => handleclick(text)}>
            {text}
        </div>
    )
}