import { WS_ENDPOINT } from "../../utils/constants/Endpoints";

export class WebSocketClient {
  public hasError: boolean = false;
  private endpoint: string = WS_ENDPOINT;
  private ws: WebSocket | null = null;
  private wsStatus: boolean = false;
  private sessionRef: string = '';
  private sessionCallback: (val:boolean) => void;
  private valueCallback: (val:string) => void = () => {};
  private statusCallback: (val:boolean) => void;

  constructor(sessionCallback:(val:boolean) => void, statusCallback:(val:boolean) => void) {
    this.sessionCallback = sessionCallback;
    this.statusCallback = statusCallback;
  }

  private isConnected(): boolean {
    return !this.ws && this.wsStatus;
  }

  connect(needsSession?:boolean) {
    this.hasError = false;
    if (this.isConnected()) {
      return;
    }

    try {
      this.ws = new WebSocket(this.endpoint);
    } catch (error) {
      this.wsStatus = false;
      this.statusCallback(false);
      this.hasError = true;
      return;
    }

    this.ws.onopen = () => {
      this.wsStatus = true;
      this.statusCallback(true);
      if(needsSession) {
        this.createSession();
      }
    };

    this.ws.onmessage = (event) => {
      const response: StatusResponse | Message = JSON.parse(event.data);
      if (response.mode === 'sessionResponse') {
        this.sessionRef = response.sessionRef;
        this.sessionCallback(response.success);
      } else if (response.mode === 'message') {
        this.valueCallback(response.message);
      } else if (response.mode === 'statusResponse') {
        this.sessionRef = response.sessionRef;
        this.sessionCallback(response.success);
      }
    };

    this.ws.onclose = () => {
      this.close();
    }
  }

  public getWsStatus():boolean{
    return this.wsStatus;
  }
  public getSessionRef():string{
    return this.sessionRef;
  }
  public setValueCallback(callback:(val:string) => void){
    this.valueCallback = callback; 
  }

  public connectToSession(sessionRef:string) {
    this.sessionRef = sessionRef; 

    const msg = {
      "mode":"join", 
      "sessionRef": sessionRef
    }

    this.send(JSON.stringify(msg));
  }


  public send(data: string) {
    if (this.ws) {
      this.ws.send(data);
    }
  }
  public sendMessage(text:string) {
    const msg = {
      "mode":"message", 
      "sessionRef": this.sessionRef, 
      "message": text, 
    }

    this.send(JSON.stringify(msg));
  }

  public close() {
    if (this.ws) {
      this.wsStatus = false;
      this.statusCallback(false);
      this.ws.close();
    }
  }

  public createSession(){
    const msg = {
      "mode":"create", 
    }
    if(this.wsStatus) {
      this.send(JSON.stringify(msg))
    } else {
      this.connect(true);
    }

  }
}


type StatusResponse = {
  mode:"statusResponse" | "sessionResponse", 
  sessionRef: string, 
  success: boolean, 
}
type Message = {
  mode: 'message',
  sessionRef: string,
  message: string, 
}