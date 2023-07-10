import { useState } from "react";

function Square({ value, onSquareClick, box }) {
  return (
    <button className="square" id={box} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, lastMove }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (lastMove === 9) {
    status = "Draw: XO";
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square
          value={squares[0]}
          onSquareClick={() => handleClick(0)}
          box={0}
        />
        <Square
          value={squares[1]}
          onSquareClick={() => handleClick(1)}
          box={1}
        />
        <Square
          value={squares[2]}
          onSquareClick={() => handleClick(2)}
          box={2}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[3]}
          onSquareClick={() => handleClick(3)}
          box={3}
        />
        <Square
          value={squares[4]}
          onSquareClick={() => handleClick(4)}
          box={4}
        />
        <Square
          value={squares[5]}
          onSquareClick={() => handleClick(5)}
          box={5}
        />
      </div>
      <div className="board-row">
        <Square
          value={squares[6]}
          onSquareClick={() => handleClick(6)}
          box={6}
        />
        <Square
          value={squares[7]}
          onSquareClick={() => handleClick(7)}
          box={7}
        />
        <Square
          value={squares[8]}
          onSquareClick={() => handleClick(8)}
          box={8}
        />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    const nextHistory = [...history.slice(0, nextMove + 1)];
    for (let b = 0; b < 9; b++) {
      document.getElementById(b).style.color = "black";
    }
    setHistory(nextHistory);
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Begin the game";
    }
    return (
      <li>
        <button className="btn" key={move} onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  function restart() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  return (
    <>
      <div className="container">
        <div className="game">
          <div className="game-board">
            <Board
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
              lastMove={currentMove}
            />
          </div>
          <div className="game-info">
            <ul>{moves}</ul>
          </div>
        </div>
      </div>
      <div className="container">
        <button className="restartBtn" onClick={restart}>
          Restart Game
        </button>
      </div>
    </>
  );
}

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
      const clr = squares[a] === "X" ? "green" : "orange";
      for (let b of lines[i]) {
        document.getElementById(b).style.color = clr;
      }
      return squares[a];
    }
  }
  return null;
}