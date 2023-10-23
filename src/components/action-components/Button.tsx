import './../../css/components/action-components/button.css';

export default function Button(props:{classOverride?:string, text:string, callback:() => void, style?:React.CSSProperties}) {
    const { classOverride, text, callback, style } = props; 
    return (
        <button className={'button-base ' + classOverride} onClick={callback} style={style}>
            {text}
        </button>
    )
}