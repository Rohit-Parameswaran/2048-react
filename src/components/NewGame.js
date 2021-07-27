import React, { useRef } from "react";
import "./NewGame.css";

function NewGame(props) {
  const handleClick = () => {
    document.querySelector(".game-over-bg").style.display = "none";
    document.querySelector(".game-over-popup").style.display = "none";

    props.startNewGame();
  };

  return (
    <>
      <div className="game-over-popup">
        <div className="confirmation-text">Game Over</div>
        <div className="button-container">
          <button className="confirmation-button" onClick={handleClick}>
            New Game
          </button>
        </div>
      </div>
      <div className="game-over-bg"></div>

      <div className="btn-container">
        <button
          className="confirmation-button"
          onClick={() => {
            props.setDisplayText();
            handleClick();
          }}
        >
          New Game
        </button>
      </div>
    </>
  );
}

export default NewGame;
