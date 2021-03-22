import React from 'react';

class From extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <label>
                    {this.props.label}
                    <input type='text' value={this.props.value} onChange={e => this.props.value = e.target.value} />
                </label>
            </form>
        );
    }
}

export default Form;