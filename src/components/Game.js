import React, { useState, useRef } from "react";
import Board from "./Board";
import Score from "./Score";
import Instructions from "./Instructions";
import NewGame from "./NewGame";
import Confetti from "./Confetti";

function Game() {
  const [score, setScore] = useState(
    JSON.parse(localStorage.getItem("score")) || 0
  );

  const prevScore = useRef(score);
  const _setScore = (updates) => {
    prevScore.current += updates;
    setScore(prevScore.current);
    localStorage.setItem("score", JSON.stringify(prevScore.current));
  };

  const startNewGame = () => {
    localStorage.removeItem("score");
    localStorage.removeItem("board");
    window.location.reload();
  };

  const gameOver = () => {
    document.querySelector(".game-over-bg").style.display = "flex";
    document.querySelector(".game-over-popup").style.display = "flex";
  };

  const [gameWon, setGameWon] = useState(false);

  return (
    <>
      {gameWon && <Confetti startNewGame={startNewGame}/>}
      <Score score={score} />
      <Board
        handleScore={_setScore}
        gameOver={gameOver}
        setGameWon={setGameWon}
      />
      <Instructions />
      <NewGame startNewGame={startNewGame} />
    </>
  );
}

export default Game;
