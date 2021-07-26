import React from "react";
import "./Instructions.css";
import arrowKeysIcon from "./images/arrow_keys.png";
import swipeIcon from "./images/swipe.png";

function Instructions() {
  return (
    <>
      <div className="instructions">
        <div>
          <center>Use arrow keys / WASD to move tiles</center>
        </div>
        <div>
          <img className="instruction-arrow-img" src={arrowKeysIcon} />
        </div>
        <div>
          <center>Or simply swipe on the board!</center>
        </div>
        <div>
          <img className="instruction-swipe-img" src={swipeIcon} style={{'margin-top': '20px'}}/>
        </div>
      </div>
    </>
  );
}

export default Instructions;
