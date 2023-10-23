import './../css/components/inline-message.css';

export const CONTENT_NOT_FOUND_ERROR_TEXT = 'Error retrieving content, please try again later.'; 

export default function InlineMessage(props:{classOverride?:string, text:string, redErrorImage?:boolean, successImage?:boolean, textClassOverride?:string}) {
    const { classOverride, text, redErrorImage: redImage, textClassOverride, successImage } = props;
    return (
        <div className={`inline-message-container ${classOverride}`}>
            <img className='inline-message-icon' src={redImage ? require('./../assets/error-red.svg').default : successImage ? require('./../assets/check-mark.svg').default: require('./../assets/error.svg').default} alt='message-icon'/>
            <p className={`inline-message-text ${textClassOverride}`}>{text}</p>
        </div>
    )
}