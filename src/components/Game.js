import React, { useState, useRef } from "react";
import Board from "./Board";
import Score from "./Score";
import Instructions from './Instructions'

function Game() {
  const [score, setScore] = useState(0);

  const prevState = useRef(score);
  const _setScore = (updates) => {
    prevState.current += updates;
    setScore(prevState.current);
  }

  return (
    <>
      <Score score={score} />
      <Board handleScore={_setScore}/>
      <Instructions />
    </>
  );
}

export default Game;
