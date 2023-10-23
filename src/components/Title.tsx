import './../css/components/title.css'
export default function Title(props:{containerClassOverride?:string, textClassOverride?:string, text:string}) {
    const {containerClassOverride, textClassOverride, text} = props; 
    return (
        <div className={`base-title-container ${containerClassOverride}`}>
            <p className={`base-title-text ${textClassOverride}`}>{text}</p>
        </div>
    )
}