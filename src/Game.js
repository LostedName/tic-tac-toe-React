import React,{Component} from 'react'
import Board from './Board';


class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares:Array(9).fill(null),
                currentStep: Array(2).fill(null)
            }
            ],
            stepNumber: 0,
            xIsNext: true,
            winLine:[]
        }
    }


    handleClick(i){
        const history = this.state.history.slice(0,this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i])
          return;
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          history:history.concat([{
              squares:squares,
              currentStep: [Math.floor(i/3),i%3],
          }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
      });
    }

    
    jumpTo(step){
        this.setState(
            {
                stepNumber:step,
                xIsNext: (step % 2) === 0,
            }
        );
    }

    findStatus(squares){
      const winner = calculateWinner(squares);
      if (!winner && isBoardFull(squares)){
        return  "Board is full, no one the winner";
    }
    else
    if (winner){
       
        return  `Winner: ${winner[0]}`;
    }
    else{
        return `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }
    }


    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];

        const moves = history.map((step, move)=>{
            const desc = move ?
            `Go to move #${move} ${move % 2 === 1 ? "X" : "O" }(${step.currentStep[0]+1},${step.currentStep[1]+1})` :
            `Go to game start`;

            return (
              <li key={move}>
                  <button style={this.state.stepNumber === move ? {fontWeight:"bold"} : {}} onClick={()=>this.jumpTo(move)}>{desc}</button>
              </li>
          );

          
        });

      let status = this.findStatus(current.squares);
      

      return (
        <div className="game">
          <div className="game-board">
            <Board squares={current.squares} winLine={calculateWinner(current.squares)} onClick={(i)=>this.handleClick(i)}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  export default Game;
  



  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a],[a,b,c]];
      }
    }
    return null;
  }
  function isBoardFull(squares){
      for (const square of squares){
          if (!square)
            return false;
      }
      return true;
  }