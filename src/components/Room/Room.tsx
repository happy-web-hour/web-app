import React from 'react'
import { useLocation } from "react-router-dom";
import RoomButton from "../RoomButton"
import './Room.css'

interface RoomProps {
    location: {
        hash: string,
        key: string,
        pathname: string,
        search: string
        state: {
            roomName: string,
            userName: string
        }
    }
}

interface RoomStateModel {
    name: string,
    users: string[]
}

interface RoomState {
    userName?: string
    roomName?: string
    roomState?: RoomStateModel[]
}

class Room extends React.Component<RoomProps, RoomState> {
    constructor(props: RoomProps){
        super(props)
        this.state = {
            userName: "",
            roomName: "",
            roomState: []
        }
    }

    useQuery(){
        return new URLSearchParams(useLocation().search)
    }

    componentDidMount() {
        this.setState({
            roomName: this.props.location.state.roomName, 
            userName: this.props.location.state.userName,
            roomState: [
                {
                    name: "sala 01",
                    users: []
                },
                {
                    name: "sala 02",
                    users: []
                },
                {
                    name: "sala 03",
                    users: []
                },
                {
                    name: "sala 04",
                    users: []
                },
                {
                    name: "sala 05",
                    users: []
                },
                {
                    name: "sala 06",
                    users: []
                },
                {
                    name: "sala 07",
                    users: []
                },
                {
                    name: "sala 08",
                    users: []
                },
                {
                    name: "sala 09",
                    users: []
                },
                {
                    name: "sala 10",
                    users: []
                },
                {
                    name: "sala 11",
                    users: []
                },
                {
                    name: "sala 12",
                    users: []
                },
            ]
        })
    }

    render() {
        return (
            <div className="Room">
            <header className="Room-header">
                {this.state.roomState!.map((room)=>{
                    return <RoomButton title={room.name} users={room.users}></RoomButton>
                })}
            </header>
            </div>
        )
    }
}

export default Room