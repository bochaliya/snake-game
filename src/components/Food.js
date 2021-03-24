import React from 'react';

export default (props)=> {
    let style = JSON.parse(JSON.stringify(props.foodStyle));
    style.left = `${props.dot[0]}%`;
    style.top = `${props.dot[1]}%`
    return (
        <div style={style}></div>
    )
}