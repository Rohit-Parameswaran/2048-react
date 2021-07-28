import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import NewGame from "./NewGame";
import "./Confetti.css";

function Confetti(props) {
  useEffect(() => {
    const colors = ["#E7F61C", "#5B91D2"];

    var end = Date.now() + (15 * 1000);
    
    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });
    
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
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
