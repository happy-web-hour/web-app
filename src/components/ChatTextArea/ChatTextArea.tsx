import React from 'react'
import './ChatTextArea.css'

interface ChatTextAreaState {
  text: string;
}

interface ChatTextAreaProps {
  sendMsg: Function
}

class ChatTextArea extends React.Component<ChatTextAreaProps, ChatTextAreaState> {
    constructor(props: ChatTextAreaProps) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {text: ''};
    }

    handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
      if (this.state.text !== e.target.value)
        this.setState({text: e.target.value})
        e.preventDefault()
      }
      
      handleKeyPress(e: React.KeyboardEvent<HTMLTextAreaElement>){
        if(e.key === 'Enter'){
          const txt = this.state.text
          this.props.sendMsg(txt)
          this.setState({text: ""})
        }
    }

    render() {
        return (
          <div className="ChatTextArea-input-container">
            <textarea onChange={this.handleChange} onKeyPress={this.handleKeyPress} value={this.state.text} className="ChatTextArea-input" />
          </div>
        );
    }
}

export default ChatTextArea;