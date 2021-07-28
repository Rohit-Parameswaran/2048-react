import React from "react";
import "./NewGame.css";

function NewGame(props) {
  const setProperty = (selectorName, property) => {
    const element = document.querySelector(`.${selectorName}`);
    if (element) element.style.display = property;
  };

  const handleClick = () => {
    setProperty("game-over-bg", "none");
    setProperty("game-over-popup", "none");

    props.startNewGame();
  };

  const handleClick2 = () => {
    setProperty("game-over-bg", "none");
    setProperty("new-game-popup", "none");

    props.startNewGame();
  };

  const hideOverlays = () => {
    setProperty("new-game-popup", "none");
    setProperty("game-over-popup", "none");
    setProperty("game-over-bg", "none");
  };

  return (
    <>
      <div className="game-over-popup">
        <div className="close-popup" onClick={hideOverlays}></div>
        <div className="confirmation-text">Game Over</div>
        <div className="button-container">
          <button className="confirmation-button" onClick={handleClick}>
            New Game
          </button>
        </div>
      </div>
      <div className="new-game-popup">
        <div className="close-popup" onClick={hideOverlays}></div>
        <div className="confirmation-text">Start a new game?</div>
        <div className="button-container">
          <button className="confirmation-button" onClick={handleClick2}>
            New Game
          </button>
        </div>
      </div>
      <div className="game-over-bg"></div>

      <div className="btn-container">
        <button
          className="confirmation-button"
          onClick={() => {
            setProperty("game-over-bg", "flex");
            setProperty("new-game-popup", "flex");
          }}
        >
          New Game
        </button>
      </div>
    </>
  );
}

export default NewGame;
