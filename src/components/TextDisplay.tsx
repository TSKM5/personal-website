import './../css/components/text-display.css'

export default function TextDisplay(props:{overrideClass?:string, text:string}) {
    const {overrideClass, text} = props;
    return (
        <p className={`text-display-base ${overrideClass}`}>{text}</p>
    )
}