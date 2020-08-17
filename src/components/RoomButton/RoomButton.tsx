import React, {MouseEvent} from 'react'

import './RoomButton.css'

interface RoomButtonProps {
    title: string,
    users?: string[]
}
interface RoomButtonState {
    title: string,
    users?: string[]
}

class RoomButton extends React.Component<RoomButtonProps, RoomButtonState> {
    constructor(props: RoomButtonProps) {
        super(props)
        this.state = {
            title: "",
            users: []
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e: MouseEvent) {
        this.setState({users: this.props.users})
        console.info(this.state)
    }

    render() {
        const title = this.props.title
        const users = this.props.users
        return (
            <div className="RoomButton-container">
                <div className="RoomButton-title">{title}</div>
                <button className="RoomButton-users-button" onClick={this.handleClick} >
                    {users!.join(", ")}
                </button>
            </div>
        )
    }
}

export default RoomButton