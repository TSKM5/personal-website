import './../../../css/components/projects-view/websocket-demo/websocket-demo.css'
import { MobileIFrame } from "../MobileIFrame";
import WsPrototypeChatbox from "./WsPrototypeChatbox";
import { useMemo } from 'react';

export function WebsocketDemo(props:{src:string}) {
    const {src} = props; 
    const wsMemo = useMemo(() => <WsPrototypeChatbox />, []); 
    return (
        <div className="websocket-demo-container">
            {wsMemo}
            <MobileIFrame src={src} /> 
        </div>
    )
}