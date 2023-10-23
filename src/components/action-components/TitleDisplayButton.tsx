import Title from '../Title';
import './../../css/components/action-components/title-display-button.css'

export function TitleDisplayButton(props:{classOverride?:string, text:string, infoText:string, callback:() => void}) {
    const {classOverride, text, infoText, callback} = props; 
    return (
        <div className={'title-display-button-base ' + classOverride} onClick={callback}>
            <Title textClassOverride='title-display-button-text' containerClassOverride='title-display-button-text-container' text={text}/>
            <p className='title-display-button-text'>{infoText}</p> 
        </div>
    )
}