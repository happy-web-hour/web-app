import React from "react";

import "./ChatBalloon.css";

interface ChatBalloonProps {
  type: string;
  userName?: string,
  msg?: string,
  timestamp: Date
}
interface ChatBalloonState {}

class ChatBalloon extends React.Component<ChatBalloonProps, ChatBalloonState> {
  constructor(props: ChatBalloonProps) {
    super(props);
    this.state = {};
  }

  render() {
    const type = this.props.type;
    const userName = this.props.userName;
    const msg = this.props.msg;
    const timestamp = this.props.timestamp;
    if(type !== "sys"){
      return (
        <div className={`ChatBalloon-line-container-${type}`}>
          <div className={`ChatBalloon-container-${type}`}>
            <div className={`ChatBalloon-username-${type}`}>{userName}</div>
            <div className={`ChatBalloon-usermessage-${type}`}>{msg}</div>
            <div className={`ChatBalloon-timestamp-${type}`}>{timestamp.toLocaleString()}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={`ChatBalloon-line-container-${type}`}>
          <div className={`ChatBalloon-container-${type}`}>
            <div className={`ChatBalloon-usermessage-${type}`}>{msg}</div>
            <div className={`ChatBalloon-timestamp-${type}`}>{timestamp.toLocaleString()}</div>
          </div>
        </div>
      );
    }
  }
}

export default ChatBalloon;
