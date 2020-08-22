import React from "react";
import ChatBalloon from '../ChatBalloon'
import ChatTextArea from '../ChatTextArea'
import "./Chat.css";


interface ChatProps {
  roomId: string,
  roomName: string
}
interface ChatState {}

class Chat extends React.Component<ChatProps, ChatState> {
  _msg = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  constructor(props: ChatProps) {
    super(props);
    this.state = {};
  }

  render() {
    const roomName = this.props.roomName
    return (
    <div className="Chat-container">
      <div className="Chat-background">
        <div className="Chat-room-name">{roomName}</div>
        <div className="Chat-history-container">
          <ChatBalloon type="self" userName="Gabriel" msg={this._msg}/>
          <ChatBalloon type="user" userName="Ronaldo" msg={this._msg}/>
          <ChatBalloon type="user" userName="Ronaldo" msg={this._msg}/>
          <ChatBalloon type="self" userName="Gabriel" msg={this._msg}/>
          <ChatBalloon type="self" userName="Gabriel" msg="banana"/>
          <ChatBalloon type="user" userName="Ronaldo" msg="pera"/>
          <ChatBalloon type="sys" msg="fulano de tal entrou" timestamp="12:45:00 12/08/2020"/>
        </div>
        <div className="Chat-textarea-container">
          <ChatTextArea/>
        </div>
      </div>

    </div>
    );
  }
}

export default Chat;
