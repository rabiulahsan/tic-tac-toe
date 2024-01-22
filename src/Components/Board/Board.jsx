import { useState } from "react";
import Box from "./Box";

/* eslint-disable react/prop-types */
const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerX, setPlayerX] = useState(true);

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
    setPlayerX(!playerX);
  };
  return (
    <div className="grid grid-cols-3 gap-2">
      {board.map((value, idx) => (
        <Box
          key={idx}
          value={value}
          idx={idx}
          handleClick={!value && handleClick}
        ></Box>
      ))}
    </div>
  );
};

export default Board;
