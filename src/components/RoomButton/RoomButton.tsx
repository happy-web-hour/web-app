import React, {MouseEvent} from 'react'
import {RoomApi} from '../../api'
import {Pinner} from "../../api"

import './RoomButton.css'

interface RoomButtonProps {
    title: string,
    roomId: string,
    roomName: string,
    users: string[],
    userId: string,
    pinId: string,
    handleGroupChange: Function,
    actualGroup: string
}
interface RoomButtonState {
    title: string,
    users: string[],
    roomId: string
}

class RoomButton extends React.Component<RoomButtonProps, RoomButtonState> {
    userId : string
    roomApi : RoomApi
    pinner : Pinner
    constructor(props: RoomButtonProps) {
        super(props)
        this.state = {
            title: "",
            users: [],
            roomId: props.roomId
        }
        this.handleClick = this.handleClick.bind(this)
        this.userId = props.userId
        this.roomApi = new RoomApi()
        this.pinner = new Pinner()
    }

    handleClick(e: MouseEvent) {
        this.setState({users: this.props.users})
        this.props.handleGroupChange(this.state.roomId, this.props.roomName)
    }

    render() {
        const title = this.props.title
        const users = this.props.users
        return (
            <div className="RoomButton-container">
                <div className="RoomButton-title">{title}</div>
                <button className="RoomButton-users-button" onClick={this.handleClick} >
                    {users?.join(', ')}
                </button>
            </div>
        )
    }
}

export default RoomButton