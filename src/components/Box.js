import React from 'react';

export default class Box extends React.Component {
    Box(props) {
        this.props = props;
    }
    state = {
        rowArr: this.fillRow(),
    }

    fillRow() {

        let tempArr = [];
        for(let i = 0; i < this.props.boardSize; i++) {
            let elm = <div className='box' style={{left: `${i}%`, top: `${this.props.row}%`}}></div>
            tempArr.push(elm);
        }
        //console.log(tempArr);
        return tempArr;
    }

    render() {
        return (
            <div>
                {this.state.rowArr}
            </div>
        );
    }
}