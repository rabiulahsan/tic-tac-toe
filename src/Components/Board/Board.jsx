import Box from "./Box";

/* eslint-disable react/prop-types */
const Board = () => {
  const board = ["X", "X", "X", "X", "X", "X", "X", "X", "X"];
  return (
    <div className="grid grid-cols-3 gap-2">
      {board.map((value, idx) => (
        <Box key={idx} value={value} idx={idx}></Box>
      ))}
    </div>
  );
};

export default Board;
