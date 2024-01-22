import { useEffect, useRef, useState } from "react";
import Box from "./Box";

/* eslint-disable react/prop-types */
const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerX, setPlayerX] = useState(true);
  const [gameComplete, setGameComplete] = useState(false);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [currentWinner, setCurrentWinner] = useState("");
  const [roundMatches, setRoundMatches] = useState();
  const [roundOpen, setRoundOpen] = useState(false);
  let [roundNumber, setRoundNumber] = useState(1);
  const [disable, setDisable] = useState(false);

  //   winning conditions
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

  //check winner or not
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
    // If no winner is found, check if the board is full
    if (!board.includes(null)) {
      setGameComplete(true);
      return null; // No winner, but the board is full
    }

    return null; // No win
  };

  //every click button
  const handleClick = (clickedIdx) => {
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
    if (winner) {
      if (winner === "O") {
        let { oScore } = scores;
        oScore += 1;
        setScores({ ...scores, oScore });
      } else {
        let { xScore } = scores;
        xScore += 1;
        setScores({ ...scores, xScore });
      }
    }
    setPlayerX(!playerX);
  };

  //   reset button
  const handleReset = () => {
    setGameComplete(false);
    setBoard(Array(9).fill(null));

    if (gameComplete) {
      setRoundNumber(roundNumber + 1);
    }

    // console.log(roundNumber);
  };

  //disbale reset button
  useEffect(() => {
    if (roundMatches == roundNumber) {
      setDisable(true);
    } else {
      return;
    }
  }, [roundMatches, roundNumber]);

  //   new round
  const handleNewRound = () => {
    setGameComplete(false);
    setRoundOpen(false); //TODO
    setRoundNumber(1);
    setDisable(false);
    setBoard(Array(9).fill(null));
  };

  //start round
  const roundRef = useRef(null);
  const handleStart = () => {
    setGameComplete(false);
    setScores({ xScore: 0, oScore: 0 });
    setRoundMatches(roundRef.current.value);
    setRoundOpen(true);
    setRoundNumber(1);
    setBoard(Array(9).fill(null));
  };
  //   console.log(roundOpen, roundMatches);

  return (
    <>
      <div className="flex justify-around items-center gap-x-28">
        <div className="">
          {!roundOpen && (
            <>
              <p className="text-sky-100 font-semibold text-xl text-center">
                Select Matches in a Round
              </p>

              <div className="w-full mt-2 mb-5">
                <select
                  className="block appearance-none w-full bg-slate-700 border border-slate-700 text-sky-200 font-semibold py-3 px-4 rounded leading-tight focus:outline-none focus:bg-slate-700 focus:border-slate-700 focus:text-sky-200"
                  id="grid-state"
                  ref={roundRef}
                >
                  <option value={3}>3</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                </select>
              </div>
              <button
                onClick={handleStart}
                className="px-6 py-2 text-white text-xl font-semibold rounded-sm bg-sky-500 hover:bg-sky-600"
              >
                Start
              </button>
            </>
          )}

          {roundOpen && (
            <>
              <p className="text-sky-200 font-semibold text-xl text-center">
                Round {roundNumber} of {roundMatches}
              </p>
              <div className="flex items-center justify-around flex-col mt-7">
                <p className="text-sky-500 font-semibold text-xl text-center">
                  X score: {scores.xScore}
                </p>
                <p className="text-orange-500 font-semibold text-xl text-center my-2">
                  O score: {scores.oScore}
                </p>
              </div>
              {scores.xScore === scores.oScore ? (
                <p className="font-semibold text-2xl text-white text-center">
                  Round Drawn
                </p>
              ) : scores.oScore > scores.xScore ? (
                <p className="text-orange-500 font-semibold text-xl text-center my-2">
                  Round Winner O
                </p>
              ) : (
                <p className="text-sky-500 font-semibold text-xl text-center">
                  Round Winner X
                </p>
              )}
            </>
          )}
        </div>
        <div>
          {!gameComplete && (
            <div className="my-5">
              <p className="font-semibold text-2xl text-white text-center">
                Player&apos;s move {playerX ? "X" : "O"}
              </p>
            </div>
          )}
          {gameComplete &&
            (currentWinner ? (
              <div className="my-5">
                <p
                  className={`font-semibold text-2xl  text-center ${
                    currentWinner === "X" ? "text-sky-500" : "text-orange-500"
                  }`}
                >
                  Winner is player {currentWinner}
                </p>
              </div>
            ) : (
              <div className="my-5">
                <p className="font-semibold text-2xl text-white text-center">
                  Match Drawn
                </p>
              </div>
            ))}
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
        </div>
      </div>
      <div className="mt-[2%] flex items-center justify-center gap-x-5">
        <button
          onClick={handleNewRound}
          className="px-6 py-2 text-sky-100 text-xl font-semibold rounded bg-slate-700 hover:bg-slate-600"
        >
          New Round
        </button>
        <button
          disabled={disable ? true : false}
          onClick={handleReset}
          className="px-6 py-2 text-sky-100 text-xl font-semibold rounded bg-slate-700 hover:bg-slate-600 disabled:bg-slate-400"
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default Board;
