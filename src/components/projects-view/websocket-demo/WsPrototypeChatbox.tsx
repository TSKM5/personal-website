import React, { useEffect, useState } from "react";
import './../../../css/components/projects-view/websocket-demo/ws-prototype-chatbox.css';
import InlineMessage from "../../InlineMessage";
import { WebSocketClient } from "../../../services/project-api/WebsocketClient";

export default function WsPrototypeChatbox() {
    const [isSession, setIsSession] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<boolean | null>(null);
    const [ws, setWs] = useState<WebSocketClient>(new WebSocketClient(setIsSession, setResult)); 

    const createSessionHandler = () => {
        setLoading(true);
        ws.createSession();
    }

    useEffect(() => {
        ws.connect(); 
    }, [])
    useEffect(() => {
        if (result === false) {
            setLoading(false);
        }
    }, [result]);
    useEffect(() => {
        if(result === false){
            setLoading(false);
        }
    }, [result]);

    useEffect(() => {
        if(isSession){
            setLoading(false);
            navigateToChat();
        } else {
            navigateToSessionHandler();
        }
    }, [isSession])
    
    const navigateToSessionHandler = () => {
        setLoading(false);
        setIsSession(false);
    }

    const navigateToChat = () => {
        setIsSession(true); 
        setLoading(false);
    }

    if(result === false){
        return <InlineMessage text={"CONTENT_NOT_FOUND_ERROR_TEXT"} /> 
    }

    return (
        <div className="ChatboxWrapper">
            {
                !isSession && (
                    <>
                        <CreateSessionScreen callback={createSessionHandler} loading={loading}/>
                    </>
                )
            }
            {
                isSession && (
                    <Chatbox ws={ws}/> 
                )
            }
        </div>
    )
}

function CreateSessionScreen(props:{callback:Function, loading:boolean}){
    const {callback, loading} = props; 
    return (
        <div className="ChatboxSessionWrapper">
            <div className="CreateSessionButton" onClick={() => callback()}>
                <p className="CreateSessionHeader">Create Session</p>
            </div>
            {
                loading && (
                    <div className="spinner-container">
                        <div className="loading-spinner">
                    </div>
                </div>
                )
            }

        </div>
    )
}

type message = {
    text:string, 
    incoming: boolean
}

function Chatbox(props:{ws:WebSocketClient}) {
    const {ws} = props;
    const [incomingValue, setIncomingValue] = useState<string>(); 
    const [messageList, setMessageList] = useState<message[]>([]); 
    const [text, setText] = useState('');


    function sendMessage() {
        if(text.trim() !== ''){
            ws!.sendMessage(text);
            setMessageList([...messageList, {text: text, incoming: false}])
            setText('');
        }
    }

    useEffect(() => {
        ws!.setValueCallback(setIncomingValue); 
    }, []);

    useEffect(() => {
        if(incomingValue !== null && incomingValue !== '' && incomingValue !== undefined){
            setMessageList([...messageList, {text: incomingValue!, incoming: true}])
        }
    },[incomingValue])
    return (
        <div className="ChatboxScreenWrapper">
            <p className="SessionHeaderText">Connected to: {ws.getSessionRef()}</p>
            <div className="MessageList">
                {
                    messageList.map((e, i) => (
                        <MessageRow key={i} text={e.text} incoming={e.incoming} />
                    ))
                }
            </div>
            <div className="ChatboxInputWrapper">
                <textarea
                    className="ChatboxInput"
                    placeholder="Type here"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                />
                <img 
                    className="SendImage"
                    src={require('./../../../assets/ws-poc/send-icon.svg').default}
                    onClick={sendMessage}
                />
            </div>
        </div>
    )
}

function MessageRow(props:{text:string, incoming:boolean}){
    const { text, incoming } = props;
    const messageClass = incoming ? 'incoming' : 'outgoing';

    return (
        <div className={`messageRow ${messageClass}`}>
            <p className={`messageText ${messageClass}`}>{text}</p>
        </div>
    );
}