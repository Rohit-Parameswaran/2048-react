import React from "react";
import "./Score.css";

function Score({ score }) {
  return (
    <div className="scoreboard">
      <div className="scoreboard__heading">Score</div>
      <div className="score">{score}</div>
    </div>
  );
}

export default Score;
