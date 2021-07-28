import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import NewGame from "./NewGame";
import "./Confetti.css";

function Confetti(props) {
  useEffect(() => {
    confetti();
  }, []);

  return (
    <>
      <div className="winning-screen">
        <div class="winning-screen__heading">
          <h1>2048</h1>
        </div>
        <div className="winning-screen__subheading">
          <center>Congratulations! You made it🎊🎇</center>
        </div>
        <NewGame startNewGame={props.startNewGame} />
      </div>
      <div className="overlay" style={{ display: "flex" }}></div>
    </>
  );
}

export default Confetti;
