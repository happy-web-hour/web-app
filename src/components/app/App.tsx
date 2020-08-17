import React, {MouseEvent} from 'react';
import TypeField from '../TypeField'
import Button from '../Button'
import './App.css';

interface AppState {
  roomName: string,
  userName: string
}
interface AppProps {}

class AppClass extends React.Component<AppProps, AppState> {
  constructor(props: AppProps){
    super(props)
    this.state = {
        roomName: "",
        userName: ""
    }
  }
  newRoomHandle() {
    console.info("new room...", this.state)
  }
  enterHandle() {
    console.info(this.state.userName)
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-title-container">
            <h1 className="App-title">Happy Web Hour</h1>
          </div>
          <div className="Input-container">
            <TypeField initialState="Digite seu Nome!" textHandle={(text: string) => this.setState({userName: text})} />
            <TypeField initialState="Cole o código da sua sala" textHandle={(text: string) => this.setState({roomName: text})} />
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

export default AppClass;
