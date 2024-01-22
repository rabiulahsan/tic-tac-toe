/* eslint-disable react/jsx-key */
import Board from "../Board/Board";
import FadeAnimations from "../FadeAnimations/FadeAnimations";
import "./style.css";
const TicTacToe = () => {
  return (
    <div className="h-screen w-full bg-slate-800 flex justify-center items-center flex-col">
      <FadeAnimations delay={0.5} direction="down" once={false} duration={0.7}>
        <p className="text-sky-200 font-semibold text-4xl block mb-[5%] italic">
          Tic Tac Toe
        </p>
      </FadeAnimations>
      <Board></Board>
    </div>
  );
};

export default TicTacToe;
