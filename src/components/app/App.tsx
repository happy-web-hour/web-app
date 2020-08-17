import React, {MouseEvent} from 'react';
import TypeField from '../TypeField'
import Button from '../Button'
import  { Redirect } from 'react-router'
import './App.css';

interface AppState {
  roomName: string,
  userName: string,
  redirect: boolean
}
interface AppProps {}

class AppClass extends React.Component<AppProps, AppState> {
  constructor(props: AppProps){
    super(props)
    this.state = {
        roomName: "",
        userName: "",
        redirect: false
    }
  }

  _makehash(length: Number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  newRoomHandle() {
    this.setState({roomName: this._makehash(20)})
  }
  enterHandle() {
    console.info(this.state.userName, this.state.roomName)
    this.setState({redirect: true})
  }

  render(){
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: "/room",
        state: {roomName: this.state.roomName, userName: this.state.userName}
      }} />
    }
    else {
      return (
        <div className="App">
          <header className="App-header">
            <div className="App-title-container">
              <h1 className="App-title">Happy Web Hour</h1>
            </div>
            <div className="Input-container">
              <TypeField initialState="Digite seu Nome" textHandle={(text: string) => this.setState({userName: text})} />
              <TypeField initialState="Cole o código da sua sala" textHandle={(text: string) => this.setState({roomName: text})} parentText={this.state.roomName} />
            </div>
            <div className="Buttons-container">
              <Button text="Nova Sala" onClick={(e: MouseEvent)=> this.newRoomHandle()}></Button>
              <Button text="Entrar" onClick={(e: MouseEvent) => this.enterHandle()}></Button>
            </div>
          </header>
        </div>
      )
    }
  }
}

export default AppClass;
