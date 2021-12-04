import React from 'react';

import Square from "./Square";

const Board = (props) => {
  const renderSquare = (sq, row, column) => {
    const idx = (row * props.square_num) + column
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
        idx={idx}
        key={`square_${idx}`}
        onDrop={() => props.onDrop([row, column])}
      >
        {sq}
      </Square>
    );
  }


  /**
   * Game.state.historyは
   *  [{
   *   squares: [
   *      [0, 0, 0],
   *      [0, 0, 0],
   *      [0, 0, 0]
   *    ] 
   *  }]
   * と最初から二次元配列で宣言するようにしたんですね。
   * 
   */
  const squares = props.squares.map((line, row) => (
    <div className="board-row" key={`div_${row}`} data-key={`div_${row}`}>
      {line.map((val, column) => renderSquare(val, row, column))}
    </div>
  ))
  
  return (
    <div>
      {squares}
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