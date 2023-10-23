import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

export function MobileIFrame(props:{src:string}) {
    const {src} = props; 
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
    return (
        <div>
            {loading && <LoadingSpinner hasContainer={true}/>}
            <iframe
                src={src}
                width="330px"
                height="670px"
                ref={iframeRef}
                style={{ display: loading ? 'none' : 'block' }}
            />
        </div>

    )
}