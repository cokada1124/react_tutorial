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
    
    // const lines_cross_1 = [] //// 変数名は意味を表す命名を心がけましょう。命名で10分以上迷ってしまうようなら時間がかかりすぎなので、諦めて適当な命名でもいいです
    // for(let i = 0; i < 10; i++){
    //   lines_cross_1.push([i, i])
    // }

    // console.log(squares[lines_a[1]]);

    const lines_cross_1 = []
    for(let i = 0; i < SQUARE_NUM; i++){
      lines_cross_1.push(squares[i][i])
    }



    const lines_cross_2 = []
    const len =10;
    for(let i = 0; i < 10; i++){
      lines_cross_2.push(squares[i][(len - 1) -i])
    }

    //// 二重ループでpushしたらlengthが２乗になりませんか？
    const lines_column = []
    for(let i = 0; i < 10; i++){
      for(let j = 0; j < 10; j++){  
        lines_column.push(squares[i][j])
      }
      // lines_column[] = lines_column
    }

    //// 二重ループでpushしたらlengthが２乗になりませんか？
    const lines_row = []
    for(let i = 0; i < 10; i++){
      for(let j = 0; j < 10; j++){  
        lines_row.push([j, i])
      }
    }
    console.log(lines_column)
    // console.log(lines_cross_1.count)
    // console.log(lines_cross_2)
    // console.log(lines_column)
    // console.log(lines_row)

    // console.log(squares[lines_a[1]])
    // console.log(lines_a[1])
    // console.log(squares)
    // console.log(squares[1][1])
    // console.log(lines_b[1])
    // console.log(lines_c[1])
    // console.log(lines_d[1])
    const aaa = [...squares]
    console.log(aaa)
    
    // for (let i =0; i <lines_cross_1.length; i++){
    // 　let a = squares[lines_cross_1[i]]
    //// やりたいのはこういうことですよね。
    //// lines_cross_1で持ってるのは値じゃなく参照なので、値を取るには行と列を指定する必要があります。
    // let a = squares[lines_cross_1[i][0]][lines_cross_1[i][1]]
    let valcount_O  = 0
    let valcount_X  = 0

    //斜め1
    for(let i = 0; i<lines_cross_1.length; i++){
        if (lines_cross_1[i] === "O"){
          valcount_O ++;
        } else if (lines_cross_1[i] === "X"){
          valcount_X ++;
        }
    }
    if (lines_cross_1[0] === "O" && valcount_O === SQUARE_NUM){
         return lines_cross_1[0];
    }
    if (lines_cross_1[0] === "X" && valcount_X === SQUARE_NUM){
        return lines_cross_1[0];
    }

    //斜め2
    for(let i = 0; i<lines_cross_2.length; i++){
      if (lines_cross_2[i] === "O"){
        valcount_O ++;
      } else if (lines_cross_2[i] === "X"){
        valcount_X ++;
      }
    }
    if (lines_cross_2[0] === "O" && valcount_O === SQUARE_NUM){
        return lines_cross_2[0];
    }
    if (lines_cross_2[0] === "X" && valcount_X === SQUARE_NUM){
        return lines_cross_2[0];
    }

    //横

      

    
    // console.log(kekka)

    // const lines_cross_1 = []
    // for(let i = 0; i < 10; i++){
    //   // lines_cross_1.push([i, i]) // こうじゃなく
    //   lines_cross_1.push(squares[i][i]) // こうすれば直接値が入りますので
    // }


    // 判定プロセス --------------------------
    // let result = null
    // lines.some(line => {
    //   const game_over = line.every(v => v === line[0])
    //   if(game_over) { result = line[0] }
    //   return game_over
    // })

    // return result
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
    squares[row][column] = this.state.xIsNext ? 'X' : 'O';
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