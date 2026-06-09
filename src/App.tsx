import { useState } from "react";

function Square({ value, onSquareClick }: { value: string | undefined; onSquareClick: () => void }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, setXIsNext, onPlay }: { xIsNext: boolean; setXIsNext: (xIsNext: boolean) => void; onPlay: (nextSquares: Array<string | undefined>) => void }) {
  const [squares, setSquares] = useState<Array<string | undefined>>(Array(9).fill(undefined));

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    onPlay(nextSquares);
  }

  const status = determineStatus(squares, xIsNext);

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => {handleClick(0)}} />
        <Square value={squares[1]} onSquareClick={() => {handleClick(1)}} />
        <Square value={squares[2]} onSquareClick={() => {handleClick(2)}} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => {handleClick(3)}} />
        <Square value={squares[4]} onSquareClick={() => {handleClick(4)}} />
        <Square value={squares[5]} onSquareClick={() => {handleClick(5)}} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => {handleClick(6)}} />
        <Square value={squares[7]} onSquareClick={() => {handleClick(7)}} />
        <Square value={squares[8]} onSquareClick={() => {handleClick(8)}} />
      </div>
    </>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [history, setHistory] = useState<Array<Array<string | undefined>>>([Array(9).fill(undefined)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares: Array<string | undefined>) {
    const nextHistory = [...history, nextSquares];
    setHistory(nextHistory);
    setXIsNext(!xIsNext);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} setXIsNext={setXIsNext} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: Array<string | undefined>): string | undefined {
  const lines: [number, number, number][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return undefined;
}

function determineStatus(squares: Array<string | undefined>, xIsNext: boolean): string {
  const winner = calculateWinner(squares);
  if (winner) {
    return `Winner: ${winner}`;
  } else {
    return `Next player: ${xIsNext ? 'X' : 'O'}`;
  }
}