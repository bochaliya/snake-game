import React from 'react';

class List extends React.Component {

    render() {
        return (
            <div className='list-row'>
                <h4 className='list-item'>{this.props.data[0]}</h4>
                <h4 className='list-item'>{this.props.data[1]}</h4>
                <h4 className='list-item'>{this.props.data[2]}</h4>
            </div>
        );
    }
}

export default List;