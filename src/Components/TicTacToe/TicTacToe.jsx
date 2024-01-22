/* eslint-disable react/jsx-key */
import Board from "../Board/Board";
import "./style.css";
const TicTacToe = () => {
  return (
    <div className="h-screen w-full bg-slate-800 flex justify-center items-center flex-col">
      <p className="text-white font-semibold text-3xl block mb-[5%]">
        Tic Tac Toe
      </p>
      <Board></Board>
    </div>
  );
};

export default TicTacToe;
