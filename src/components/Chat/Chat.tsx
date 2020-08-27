import React from "react";
import ChatBalloon from '../ChatBalloon'
import ChatTextArea from '../ChatTextArea'
import {RoomApi} from '../../api'
import {ChatApi} from '../../api'
import {Pinner} from '../../api'
import "./Chat.css";
// import Room from "../Room";


interface ChatProps {
  pinId: string,
  roomId: string,
  roomName: string,
  userId: string,
  visibility: boolean,
  chatUpdated: Function,
  needUpdate: boolean
}
interface ChatState {
  lastMessageId: string,
  allMessageId: string[],
  chatHistory: {messageId: string, userId: string, message: string, timestamp: number, systemMessage: boolean}[]
}

class Chat extends React.Component<ChatProps, ChatState> {
  _msg = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  roomApi : RoomApi
  chatApi : ChatApi
  pinnerApi : Pinner
  chatHistory : JSX.Element[]

  constructor(props: ChatProps) {
    super(props);
    this.state = {
      lastMessageId: "",
      chatHistory: [],
      allMessageId: []
    };
    this.roomApi = new RoomApi()
    this.chatApi = new ChatApi()
    this.pinnerApi = new Pinner()
    this.chatHistory = []
    this.getMessages = this.getMessages.bind(this)
    this.handleChatSendMsg = this.handleChatSendMsg.bind(this)
    this.checkIfExists = this.checkIfExists.bind(this)
    this.getMsgType = this.getMsgType.bind(this)
  }

  handleChatSendMsg(text: string){
    this.chatApi.sendMsg(this.props.roomId, this.props.userId, {message: text})
      .then(data => this.setState({lastMessageId: data.messageId}))
  }

  getMsgType(isSysType: boolean, msgUserId: string) : string {
    return isSysType === true ? "sys" : msgUserId.match(this.props.userId) === null ? "user" : "sys"
  }

  getMessages() {
    if(this.props.roomId){
      if(this.state.allMessageId.length > 0){
        this.chatApi.getMsgFromId(this.props.roomId, this.state.lastMessageId)
          .then((messages)=> {
            messages.forEach((message)=> {
              if(this.checkIfExists(message.messageId) === false){
                const msgType = this.getMsgType(message.systemMessage, message.userId)
                this.chatHistory.push(<
                  ChatBalloon
                  type={msgType} 
                  userName={"user name"} 
                  msg={message.message} 
                  timestamp={String(message.timestamp)}
                  />)
                let ids = this.state.allMessageId
                ids.push(message.messageId)
                this.setState({allMessageId: ids})
              }
            })
          })
      }else {
        this.chatApi.getAllMsg(this.props.roomId)
          .then((messages)=> {
            messages.forEach((message)=> {
              if(this.checkIfExists(message.messageId) === false) {
                const msgType = this.getMsgType(message.systemMessage, message.userId)
                this.chatHistory.push(<
                  ChatBalloon
                  type={msgType} 
                  userName={"user name"} 
                  msg={message.message} 
                  timestamp={String(message.timestamp)}
                  />)
                let ids = this.state.allMessageId
                ids.push(message.messageId)
                this.setState({allMessageId: ids})
              }
            })
          })
      }
    }
  }

  checkIfExists(value: string) : boolean {
    let state = false
    this.state.allMessageId.forEach((i)=> {
      if(i.match(value)){
        state = true
      }
    })
    return state
  }

  componentDidUpdate() {
    if(this.props.needUpdate === true){
      this.chatHistory = []
      this.setState({chatHistory: []})
      this.props.chatUpdated()
    }
    this.getMessages()
  }

  render() {
    if(!this.props.visibility)
      return (<div></div>)

    const roomName = this.props.roomName

    return (
      <div className="Chat-container">
        <div className="Chat-background">
          <div className="Chat-room-name">{roomName}</div>
          <div className="Chat-history-container">
            {this.chatHistory}
          </div>
          <div className="Chat-textarea-container">
            <ChatTextArea sendMsg={this.handleChatSendMsg}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
