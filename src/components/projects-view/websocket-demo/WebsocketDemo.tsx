import './../../../css/components/projects-view/websocket-demo/websocket-demo.css'
import { MobileIFrame } from "../MobileIFrame";
import WsPrototypeChatbox from "./WsPrototypeChatbox";

export function WebsocketDemo(props:{src:string}) {
    const {src} = props; 

    return (
        <div className="websocket-demo-container">
            <WsPrototypeChatbox /> 
            <MobileIFrame src={src} /> 
        </div>
    )
}