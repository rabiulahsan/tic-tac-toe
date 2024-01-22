import { useState } from "react";
import Box from "./Box";

/* eslint-disable react/prop-types */
const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerX, setPlayerX] = useState(true);
  const [gameComplete, setGameComplete] = useState(false);
  //   const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [currentWinner, setCurrentWinner] = useState("");

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (board) => {
    for (let i = 0; i < winConditions.length; i++) {
      const [x, y, z] = winConditions[i];

      // Iterate through win conditions and check if either player satisfies them
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        console.log(board[x]);
        setGameComplete(true);
        return board[x];
      }
    }
  };

  const handleClick = (clickedIdx) => {
    console.log(board);
    const newBoard = board.map((value, idx) => {
      if (idx === clickedIdx) {
        return playerX ? "X" : "O";
      } else {
        return value;
      }
    });
    setBoard(newBoard, ...board);
    const winner = checkWinner(newBoard);
    setCurrentWinner(winner);
    // if (winner) {
    //   if (winner === "O") {
    //     let { oScore } = scores;
    //     oScore += 1;
    //     setScores({ ...scores, oScore });
    //   } else {
    //     let { xScore } = scores;
    //     xScore += 1;
    //     setScores({ ...scores, xScore });
    //   }
    // }
    setPlayerX(!playerX);
  };

  const handleReset = () => {
    setGameComplete(false);
    setBoard(Array(9).fill(null));
  };

  return (
    <>
      {gameComplete && currentWinner && (
        <div className="my-5">
          <p
            className={`font-semibold text-2xl ${
              currentWinner === "X" ? "text-sky-500" : "text-orange-500"
            }`}
          >
            Winner is player {currentWinner}
          </p>
        </div>
      )}
      <div className="grid grid-cols-3 gap-2">
        {board.map((value, idx) => (
          <Box
            key={idx}
            value={value}
            idx={idx}
            handleClick={!gameComplete && !value && handleClick}
          ></Box>
        ))}
      </div>
      <div className="mt-[2%]">
        <button
          onClick={handleReset}
          className="px-6 py-3 text-sky-200 text-xl font-semibold rounded bg-slate-700"
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default Board;
