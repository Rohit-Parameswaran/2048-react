import React, { useState, useRef } from "react";
import Board from "./Board";
import Score from "./Score";
import Instructions from "./Instructions";
import NewGame from "./NewGame";

function Game() {
  const [score, setScore] = useState(
    JSON.parse(localStorage.getItem("score")) || 0
  );

  const [displayText, setDisplayText] = useState("Game Over");

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

  // const newGameText = () => {
  //   setDisplayText('New Game?');
  // }

  return (
    <>
      <Score score={score} />
      <Board handleScore={_setScore} gameOver={gameOver} />
      <Instructions />
      <NewGame startNewGame={startNewGame} />
    </>
  );
}

export default Game;
