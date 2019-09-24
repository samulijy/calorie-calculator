import React from 'react';

class NumOnlyInput extends React.Component {
    render() { 
        return (
            <input type="text" autoComplete="off" name={this.props.name} onChange={this.handleChange} value={this.props.inputValue} disabled={this.props.disabled}/>          
        );
    }

    handleChange = (event) => {
        if(!isNaN(Number(event.target.value))) {
            this.setState({inputValue: event.target.value});
            this.props.handleInputChange(event);
        }
    }
}
 
export default NumOnlyInput;