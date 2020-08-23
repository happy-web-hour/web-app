import React, { MouseEvent } from "react";
import TypeField from "../TypeField";
import Button from "../Button";
import { Redirect } from "react-router";
import "./App.css";

interface AppState {
  roomName: string;
  userName: string;
  userId: string;
  redirect: boolean;
}
interface AppProps {}

interface PostPin {
  pin: string;
}

interface PatchPin {
  userId: string;
  name: string;
}

class AppClass extends React.Component<AppProps, AppState> {
  pinner = "http://localhost:8082/pin";
  constructor(props: AppProps) {
    super(props);
    this.state = {
      roomName: "",
      userName: "",
      redirect: false,
      userId: "",
    };
  }

  _makehash(length: Number) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  apiAccess<T>(url: string, options: RequestInit): Promise<T> {
    return fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        return data as T;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  newRoomHandle() {
    const options: RequestInit = {
      method: "POST",
    };
    this.apiAccess<PostPin>(this.pinner, options).then((data) => {
      this.setState({ roomName: data.pin });
    });
  }
  enterHandle() {
    const header = new Headers()
    header.append("content-type", "application/json")
    const body = JSON.stringify({name: this.state.userName})
    const options: RequestInit = {
      method: "POST",
      body: body,
      headers: header,
      redirect: 'follow'
    };
    const url = `${this.pinner}/${this.state.roomName}`;
    console.info(options)
    this.apiAccess<PatchPin>(url, options).then((data) => {
      this.setState({
        userName: data.name,
        userId: data.userId,
        redirect: true,
      });
      console.info(data);
    });
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/room",
            state: {
              roomName: this.state.roomName,
              userName: this.state.userName,
            },
          }}
        />
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <div className="App-title-container">
              <h1 className="App-title">Happy Web Hour</h1>
            </div>
            <div className="Input-container">
              <TypeField
                initialState="Digite seu Nome"
                textHandle={(text: string) => this.setState({ userName: text })}
              />
              <TypeField
                initialState="Cole o código da sua sala"
                textHandle={(text: string) => this.setState({ roomName: text })}
                parentText={this.state.roomName}
              />
            </div>
            <div className="Buttons-container">
              <Button
                text="Nova Sala"
                onClick={(e: MouseEvent) => this.newRoomHandle()}
              ></Button>
              <Button
                text="Entrar"
                onClick={(e: MouseEvent) => this.enterHandle()}
              ></Button>
            </div>
          </header>
        </div>
      );
    }
  }
}

export default AppClass;
