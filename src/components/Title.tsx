import './../css/components/title.css'
export default function Title(props:{textClassOverride?:string, text:string}) {
    const {textClassOverride, text} = props; 

    return <h1 className={`base-title-text ${textClassOverride}`}>{text}</h1>
}