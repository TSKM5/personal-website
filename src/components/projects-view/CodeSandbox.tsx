import './../../css/components/projects-view/code-sandbox.css'
import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

export default function CodeSandbox(props:{src:string, classOverride?:string}) {
    const {src, classOverride} = props;
    const [loading, setLoading] = useState(true);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const handleLoad = () => {
          setLoading(false);
        };
    
        const iframe = iframeRef.current;
        if (iframe) {
          iframe.addEventListener('load', handleLoad);
        }
    
        return () => {
          if (iframe) {
            iframe.removeEventListener('load', handleLoad);
          }
        };
    }, []);

    return(
        <div className={'code-sandbox-container ' + classOverride} >
            {loading && <LoadingSpinner hasContainer={true}/>}
            <iframe className={'code-sandbox-iframe'} ref={iframeRef} src={src} style={{ display: loading ? 'none' : 'block' }}/> 
        </div>
    )
}