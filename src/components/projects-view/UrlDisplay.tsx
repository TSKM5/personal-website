import { useEffect, useState } from 'react';
import IconButton from '../action-components/IconButton';
import './../../css/components/projects-view/url-display.css'
import ToolTip from '../ToolTip';
import { externalNavigate } from '../../utils/navigation';


enum ClipboardStates {
    IDLE,
    SUCCESS,
    ERROR,
}

export default function UrlDisplay(props:{url:string, header:string,}) {
    const {url, header} = props;
    const [mouseHover, setMouseHover] = useState<boolean>(false);
    const [ToolTipText, setToolTipText] = useState<string>('');
    const [clipboardState, setClipboardState] = useState<ClipboardStates>(ClipboardStates.IDLE);
    
    const mouseOver = (text:string) => {
        if(text.length > 50){
            setToolTipText(text.substring(0, 50) + '...');
        } else {
            setToolTipText(text);
        }
        setMouseHover(true);
    }

    const mouseLeave = () => {
        setMouseHover(false);
        setToolTipText('');
    }

    const handleCopyToClipboard = async () => {
        try {
            navigator.clipboard.writeText(url).then(() => setClipboardState(ClipboardStates.SUCCESS));
        } catch (err) {
           setClipboardState(ClipboardStates.ERROR);
        }
    };

    useEffect(() => {
        if(clipboardState !== ClipboardStates.IDLE) {
            setTimeout(() => {
                setClipboardState(ClipboardStates.IDLE);
            }, 2000);
        }
    }, [clipboardState]);


    return (
        <>
            <div className={`url-display-container`}>
                <h3 className={`url-display-header`}>{header}</h3>
                <div className='url-display-content-container'>
                    <div className='url-display-url-container'>
                        <p className='url-display-url-text' onClick={() => externalNavigate(url)} onMouseEnter={() => mouseOver(`Navigate to ${url}`)} onMouseLeave={() => mouseLeave()}>{url}</p>
                    </div>
                    <span onMouseEnter={() => mouseOver('Copy')}  onMouseLeave={() => mouseLeave()}>
                        <IconButton asset={require('./../../assets/copy.svg')} callback={() => handleCopyToClipboard()} classOverride='url-display-copy-icon'/>
                    </span>
                </div>
            </div>
            {
                mouseHover && (
                    <ToolTip text={ToolTipText}/> 
                )
            }
            {
                clipboardState !== ClipboardStates.IDLE && (
                    <ToolTip text={clipboardState === ClipboardStates.SUCCESS ? 'Success!' : 'Error.'}/>
                )
            }
        </>
    )
}
