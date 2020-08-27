import React, {MouseEvent} from 'react'
import {RoomApi} from '../../api'
import {Pinner} from "../../api"

import './RoomButton.css'

interface RoomButtonProps {
    title: string,
    roomId: string,
    roomName: string,
    users?: string[],
    userId: string,
    pinId: string,
    handleGroupChange: Function,
    actualGroup: string
}
interface RoomButtonState {
    title: string,
    users?: string[],
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

    // componentDidUpdate() {
    //     if(this.props.actualGroup !== "" && this.props.actualGroup !== this.state.roomId) {
    //         if(this.state.users?.find(user => user === this.props.userId)) {
    //             console.info(this.state.users, this.props.userId)
    //             let index = this.state.users.indexOf(this.props.userId)
    //             console.info(index)
    //             // if (index >= -1)
    //             this.setState({users: this.state.users.splice(index)})
    //             this.roomApi.removeUser(this.state.roomId, this.props.userId)
    //         }
    //     }
    // }

    render() {
        const title = this.props.title
        const users = this.props.users
        let usersState = this.state.users
        this.pinner.getUsers(this.props.pinId, users!)
            .then(data => {
                this.setState({users: data.map((d) => d.name)})
            })
        return (
            <div className="RoomButton-container">
                <div className="RoomButton-title">{title}</div>
                <button className="RoomButton-users-button" onClick={this.handleClick} >
                    {usersState!.join(', ')}
                </button>
            </div>
        )
    }
}

export default RoomButton