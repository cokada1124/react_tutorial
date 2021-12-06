import React from 'react';

function Square(props) {
  return (
    <button 
      className="square"
      data-key={`square_${props.idx}`}
      onClick={() => props.onDrop(props.idx)}
    >
      { props.children }
    </button>
  );
}

export default Square