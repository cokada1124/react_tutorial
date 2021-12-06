import React from 'react';

import Board from "./Board";

/**
 * １辺のマスの数を定義。
 */
 const SQUARE_NUM = 4


class Game extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      history: [{
        squares: Array(SQUARE_NUM**2).fill(null) // SQUARE_NUM ** 2で二乗して動的に配列を初期化
      }],
      stepNumber:0,
      xIsNext: true,
    };
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2, 3],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
        return squares[a];
      }
    }
    return null;
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ===0,
    });
  }

  dropThePiece(idx){//// チェスで駒を打つことをdropというそうなので、そんなラベリングにしてみました
    //// 適宜console.logで中身を把握しながら進めましょう。
    console.log("この手が打たれました！", idx)
    
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const current = history[history.length -1];
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[idx]){
      return;
    }
    squares[idx] = this.state.xIsNext ? 'X' : '0';
    this.setState({
      history: history.concat([{
        squares: squares, 
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    })
  }

  render() {
    const history = this.state.history;
    const current =history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

    const moves =history.map((step,move) => {
        const desc = move ?
        'Go to move #' + move :
        'Go to game start';
        return(
          <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {desc}
        </button>
        </li>
        );
    });
    
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    }else{
      status = "Next player" + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
          squares={current.squares}
          square_num={SQUARE_NUM}
          onDrop={(i) => this.dropThePiece(i)} />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}

export default Game