import React from 'react';

import Board from "./Board";

/**
 * １辺のマスの数を定義。
 */
 const SQUARE_NUM = 10

/**
 * 元々は１次元の配列でsquaresを持ってたが、
 * どうせ表示する時に二次元に展開するので、
 * 最初から二次元で持つよう変えてみてもいい。
 * 二次元で持つようにすると、勝敗判定を作る時にちょっと有利になりそう。
 */
class Game extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      history: [{
        squares: Array(SQUARE_NUM).fill(null).map(() => Array(SQUARE_NUM).fill(null)) // SQUARE_NUM ** 2で二乗して動的に配列を初期化
      }],
      stepNumber:0,
      xIsNext: true,
    };
  }
  

  calculateWinner(squares) {
    const lines_num = (SQUARE_NUM * 2) + 1 // 縦横の行数＋斜め（斜めは１回のループでクロス両方を作るので、+1）
    const lines = [...squares]
    
    for(let i = 0; i < lines_num; i++) {
      // 横
      if(i < SQUARE_NUM) {
      }
      // 縦
      else if(i >= SQUARE_NUM && i < (SQUARE_NUM*2)) {
        const column_num = (i - SQUARE_NUM)
        lines.push(squares.map(row => row[column_num]))
      }
      // 斜め
      else {
        // 斜めの左右
        Array(2).fill(null).map((a, direction) => {
          const vector = direction == 0 ? 1 : -1
          lines.push(squares.map((row, i) => row[(((SQUARE_NUM-1)*direction) + (i*vector))]))
        })
      }
    }

    console.log(lines)

    // 判定プロセス --------------------------
    let result = null
    lines.some(line => {
      const game_over = line.every(v => v === line[0])
      if(game_over) { result = line[0] }
      return game_over
    })

    return result
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ===0,
    });
  }

  /**
   * 
   * @param {array} idx : [行, 列]を数字で渡す
   * @returns 
   */
  dropThePiece(idx){//// チェスで駒を打つことをdropというそうなので、そんなラベリングにしてみました
    const [row, column] = idx
    //// 適宜console.logで中身を把握しながら進めましょう。
    console.log("この手が打たれました！", (row*SQUARE_NUM)+column)
    
    // return false
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares]
    if (this.calculateWinner(squares) || squares[idx]){
      return;
    }
    squares[row][column] = this.state.xIsNext ? 'X' : '0';
    console.log(squares[row][column]);
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