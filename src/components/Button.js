import React from 'react';

class Button extends React.Component {

    render() {
        return (
            <button
                onClick={this.props.onClick}
                style={{ backgroundColor: this.props.color }}
                className='btn'
            >
                {this.props.text}
            </button>
        );
    }
}

export default Button;