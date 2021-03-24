import React from 'react';

class Board extends React.Component {
    Board(props) {
        this.props = props;
    }

    state = {
        matrix: []
    }

    fillMatrix = () => {
        for(let i = 0; i < this.props.boardSize; i++) {
            let tempArr = [];
            for(let j = 0; j < this.props.boardSize; j++) {
                let style = {
                    left: `${j+1}%`,
                    right: `${i+1}%`
                }
                let tempBox = <div className='board-box' style={style}></div>
                tempArr.push(tempBox);
            }
            matrix.push(tempArr);
        }
    }

}