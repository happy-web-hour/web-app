import React from 'react'
import './TypeField.css'

interface TypeFieldState {
  text: string;
}

interface TypeFieldProps {
  initialState: string,
  textHandle?: Function,
  parentText?: string
}

class TypeField extends React.Component<TypeFieldProps, TypeFieldState> {
    constructor(props: TypeFieldProps) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.state = {text: ''};
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (this.state.text !== e.target.value)
        this.setState({text: e.target.value})

      if(this.props.textHandle !== undefined)
        this.props.textHandle(e.target.value)
    }

    componentDidUpdate() {
      if (this.props.parentText !== undefined && this.state.text !== this.props.parentText) {
        this.setState({text: this.props.parentText})
      }
    }

    render() {
        const text = this.state.text;
        const initText = this.props.initialState;
        return (
          <div className="Typefield-input-container">
            <input value={text} onChange={this.handleChange} placeholder={initText} className="Typefield-input"/>
          </div>
        );
    }
}

export default TypeField;