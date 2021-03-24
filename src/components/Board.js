import React from 'react';
import Box from './Box';

export default class Board extends React.Component {
    Board(props) {
        this.props = props;
    }

    state = {
        matrix: this.fillMatrix(),
    }

    fillMatrix() {
        let style = {
            left: '1%',
            top: '1%'
        }
        let tempArr = [];
        for(let i = 0; i < this.props.boardSize; i++) {
            let elm = <div><Box boardSize={this.props.boardSize} row={i} /></div>
            tempArr.push(elm);
        }
        //console.log(tempArr);
        return tempArr;
        console.log(tempArr)
    }

    render() {
        return(
            <div>
                <ul>
                    {this.state.matrix}
                </ul>
            </div>
        );
    }

}