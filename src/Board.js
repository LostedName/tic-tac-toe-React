import React,{Component} from "react";
import Square from "./Square";
class Board extends Component {

    renderSquare(i) {
      const isColored = this.props.winLine != null && this.props.winLine[1].includes(i);
      return (
      <Square
      key={i}
      isColored={isColored}
      value={this.props.squares[i]}
      onClick={()=> this.props.onClick(i)}
      />
      );
    }
    
    render() {
        const boardArr = [];
        for (let i = 0;i<3;i++){
          const tempArr = [];

          for (let j = 0;j<3;j++){
            tempArr.push(this.renderSquare(i*3 + j));
          }

          boardArr.push((<div className="board-row" key={i}>{tempArr}</div>));
        }
      return (
        <div>
          {boardArr}
        </div>
      );
    }
  }

  export default Board