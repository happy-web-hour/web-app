import React, {Component} from 'react'
import './Button.css'

interface ButtonState {}

interface ButtonProps {
    text?: string,
    disable?: boolean,
    onClick: Function
}


class Button extends Component<ButtonProps, ButtonState> {
    render() {
        const {text, disable, onClick, children='Click'} = this.props
        const value = text || children
        return (
            <button className={disable ? `disable Button` : "Button"} onClick={(e)=>onClick(e)}>{value}</button>
        )
    }
}

export default Button