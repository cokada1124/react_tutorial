import React from 'react';

import Square from "./Square";

const Board = (props) => {
  const renderSquare = (sq, i) => {
    return (
      /**
       * ropsを改行するならインデントを下げたい（単なる好み）
       * ReactComponentに渡すものは基本的に全てpropsなんですよね。
       * なので例えばonClick=とかstyle=とかHTMLやJSのプロパティ名と同名で渡すと
       * それだけで動作するように誤解してしまいます。
       * 実際には渡された子コンポーネントの方でよしなに受け取り、使わないと動かないです。
       * 例）SquareにonClickを渡しても、Square側でonClickにprops.onClickをはめないと、ただ受け取っただけになる
       * なのでpropsのプロパティ名には予約語を使わないのが自分の好みです。
       * ということで、ここでは「手を打つ」という意味でonDropという名称を使いました。
       */
      <Square 
        idx={i}
        key={`square_${i}`}
        onDrop={() => props.onDrop(i)}
      >
        {sq}
      </Square>
    );
  }
    
  /**
   * 配列を１辺の長さで折り返してテーブルを作る。
   * [
   *  [x, x, x],
   *  [x, x, x],
   *  [x, x, x]
   * ]
   * のような。（each_rowのこと）
   * で、１行ごとに<div className="borad-row"></div>でwrapして返却する。
   */
    const renderSquares = () => {
      const each_row = []
      const {squares, square_num} = props
      squares.forEach((sq, i) => {
        const row = Math.floor(i / square_num)
        console.log(props)
        // const column = i % square_num
        each_row[row] = each_row[row] === undefined ? [sq] : [...each_row[row], sq]
      })

      return each_row.map((squares, i) => (
        <div className="board-row" key={`row_${i}`}>
          {squares.map((sq, j) => renderSquare(sq, (i*square_num) + j))}
        </div>
      ))
    }
  
  return (
    <div>
      {renderSquares()}
      {/* <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div> */}
    </div>
  );
}

export default Board