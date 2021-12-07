import React from 'react';

import Board from "./Board";

/**
 * １辺のマスの数を定義。
 */
 const SQUARE_NUM = 10


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
    const lines_num = (SQUARE_NUM * 2) + 1 // 縦横の行数＋斜め（斜めは１回のループでクロス両方を作るので、+1）
    const lines = []
    for(let i = 0; i < lines_num; i++) {
      // 横
      if(i < SQUARE_NUM) {
        const start = i * SQUARE_NUM
        const end = start + SQUARE_NUM
        const this_line = squares.slice(start, end)
        lines.push(this_line)
      }
      // 縦
      else if(i >= SQUARE_NUM && i < (SQUARE_NUM*2)) {
        const column_num = (i - SQUARE_NUM)
        const column = []
        for(let j = 0; j < SQUARE_NUM; j++) {
          column.push(squares[(column_num + (j * SQUARE_NUM))])
        }
        lines.push(column)
      }
      // 斜め
      else {
        // 斜めの左右
        Array(2).fill(null).map((a, direction) => {
          const vector = direction == 0 ? 1 : -1
          let position = null

          const diagonal = Array(SQUARE_NUM).fill(null).map((b, num) => {
            position = position == null ? (SQUARE_NUM - 1) * direction : position + (SQUARE_NUM + vector)
            return squares[position]
          })
          lines.push(diagonal)
        })
       }
     }
    console.log(lines)

     console.log(squares)
     
    const lines_a = []
    for(let i = 0; i < 10; i++){
      lines_a.push([i, i])
    }



    const lines_b = []
    const len =10;
    for(let i = 0; i < 10; i++){
      lines_b.push([i, (len - 1) -i ])
    }

    const lines_c = []
    for(let i = 0; i < 10; i++){
      for(let j = 0; j < 10; j++){  
        lines_c.push([i, j])
      }
    }

    const lines_d = []
    for(let i = 0; i < 10; i++){
      for(let j = 0; j < 10; j++){  
        lines_d.push([j, i])
      }
    }
    for (let i =0; i <lines_a.lenght; i++){
    squares[lines_a[i]]
    }

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;


    // 判定プロセス --------------------------
    // let result = null
    // lines.some(line => {
    //   const game_over = line.every(v => v === line[0])
    //   if(game_over) { result = line[0] }
    //   return game_over
    // })

    // return result


    
    
    // const lines = [
    //   [0, 1, 2],
    //   [3, 4, 5],
    //   [6, 7, 8],
    //   [0, 3, 6],
    //   [1, 4, 7],
    //   [2, 5, 8],
    //   [0, 4, 8],
    //   [2, 4, 6],
    // ];
    // for (let i = 0; i < lines.length; i++) {
    //   const [a, b, c] = lines[i];
    //   if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
    //     return squares[a];
    //   }
    // }
    // return null;
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