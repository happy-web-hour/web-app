import React from "react";
import RoomButton from "../RoomButton";
import Chat from "../Chat";
import { RoomApi } from "../../api";
import { Pinner } from "../../api";
import "./Room.css";

interface RoomProps {
  location: {
    hash: string;
    key: string;
    pathname: string;
    search: string;
    state: {
      roomName: string;
      userName: string;
      userId: string;
    };
  };
}

interface RoomStateModel {
  name: string;
  users: string[];
  roomId: string;
}

interface RoomState {
  userName: string;
  userId: string;
  roomName: string;
  roomState: RoomStateModel[];
  actualGroup: string;
  actualGroupName: string;
  chatVisible: boolean;
  chatNeedUpdate: boolean;
}

class Room extends React.Component<RoomProps, RoomState> {
  roomApi: RoomApi;
  pinner: Pinner;
  constructor(props: RoomProps) {
    super(props);
    this.state = {
      userName: "",
      userId: "",
      roomName: "",
      roomState: [],
      actualGroup: "",
      actualGroupName: "",
      chatVisible: false,
      chatNeedUpdate: false,
    };
    this.setActualGroup = this.setActualGroup.bind(this);
    this.chatUpdated = this.chatUpdated.bind(this);
    this.roomApi = new RoomApi();
    this.pinner = new Pinner();
  }

  componentDidMount() {
    try {
      setInterval(async () => {
        this.roomApi
          .getAllRoomsByPin(this.props.location.state.roomName)
          .then((data) => {
            let roomData: RoomStateModel[] = [];
            data.forEach((d) => {
              let usersNames : string[] = []
              if(d.users.length > 0) {
                this.pinner
                  .getUsers(this.props.location.state.roomName, d.users)
                  .then((users) => {
                    usersNames = users.map((u)=> u.name)
                  });
              }
              roomData.push({
                name: d.name,
                roomId: d.roomId,
                users: usersNames
              })
            });
            this.setState({
              roomName: this.props.location.state.roomName,
              userName: this.props.location.state.userName,
              userId: this.props.location.state.userId,
              roomState: roomData,
            });
          });
      }, 800);
    } catch (e) {
      console.error(e);
    }
  }

  componentDidUpdate() {
    if (this.state.chatVisible === false && this.state.actualGroup !== "") {
      this.setState({ chatVisible: true, chatNeedUpdate: true });
    }
  }

  setActualGroup(groupId: string, groupName: string) {
    // check and remove from oldest group
    if (this.state.actualGroup !== "" && this.state.actualGroup !== groupId)
      this.roomApi.removeUser(this.state.actualGroup, this.state.userId);

    // add to new one
    this.setState({
      actualGroup: groupId,
      actualGroupName: groupName,
      chatNeedUpdate: true,
    });
    this.roomApi.insertNewUser(groupId, this.state.userId);
  }

  chatUpdated() {
    this.setState({ chatNeedUpdate: false });
  }

  render() {
    let btns: JSX.Element[] = [];
    this.state.roomState.forEach((room) => {
      btns.push(
        <RoomButton
          pinId={this.state.roomName}
          title={room.name}
          users={room.users}
          roomId={room.roomId}
          userId={this.state.userId}
          actualGroup={this.state.actualGroup}
          roomName={room.name}
          handleGroupChange={this.setActualGroup}
        />
      );
    });
    return (
      <div className="Room">
        <header className="Room-header">
          <div className="App-title-container">
            <h1 className="App-title">Happy Web Hour</h1>
          </div>
          <strong>{this.state.userName}</strong>
          <div className="Room-chat-container">
            <div className="Room-master-container">{btns}</div>
            <Chat
              pinId={this.state.roomName}
              userId={this.state.userId}
              roomId={this.state.actualGroup}
              roomName={this.state.actualGroupName}
              visibility={this.state.chatVisible}
              needUpdate={this.state.chatNeedUpdate}
              chatUpdated={this.chatUpdated}
            ></Chat>
          </div>
        </header>
      </div>
    );
  }
}

export default Room;
