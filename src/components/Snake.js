import React from 'react';

export default (props) => {
    return (
        <div>
            {props.snakeParts.map((part,i)=> {
                let style = JSON.parse(JSON.stringify(props.snakeStyle));
                style.left = `${part[0]}%`;
                style.top = `${part[1]}%`;
                return (
                    <div key={i} style={style}></div>
                )
            })}
        </div>
    )
}