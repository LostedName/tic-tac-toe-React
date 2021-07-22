import React from 'react'
function Square(props){
    return (
      <button className="square" style={props.isColored ? {color:"#1FC22F"} : {}} onClick={props.onClick}>
      {props.value}
      </button>
    );
}
export default Square;