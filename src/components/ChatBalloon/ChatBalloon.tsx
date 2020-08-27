import React from "react";

import "./ChatBalloon.css";

interface ChatBalloonProps {
  type: string;
  userName?: string,
  msg?: string,
  timestamp?: string
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
    const timestamp = new Date(this.props.timestamp || "").getTime();
    if(type !== "sys"){
      return (
        <div className={`ChatBalloon-line-container-${type}`}>
          <div className={`ChatBalloon-container-${type}`}>
            <div className={`ChatBalloon-username-${type}`}>{userName}</div>
            <div className={`ChatBalloon-usermessage-${type}`}>{msg}</div>
            <div className={`ChatBalloon-timestamp-${type}`}>{timestamp}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={`ChatBalloon-line-container-${type}`}>
          <div className={`ChatBalloon-container-${type}`}>
            <div className={`ChatBalloon-usermessage-${type}`}>{msg}</div>
            <div className={`ChatBalloon-timestamp-${type}`}>{timestamp}</div>
          </div>
        </div>
      );
    }
  }
}

export default ChatBalloon;
