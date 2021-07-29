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
          <img className="instruction-arrow-img" src={arrowKeysIcon} alt="" />
        </div>
        <div>
          <center>Or simply swipe on the board!</center>
        </div>
        <div>
          <img
            className="instruction-swipe-img"
            src={swipeIcon}
            alt=""
            style={{ marginTop: "20px" }}
          />
        </div>
      </div>
    </>
  );
}

export default Instructions;
