import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import NewGame from "./NewGame";
import "./Confetti.css";

function Confetti(props) {
  useEffect(() => {
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var skew = 1;

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    (function frame() {
      var timeLeft = animationEnd - Date.now();
      var ticks = Math.max(200, 500 * (timeLeft / duration));
      skew = Math.max(0.8, skew - 0.001);

      confetti({
        particleCount: 4,
        startVelocity: 0,
        ticks: ticks,
        origin: {
          x: Math.random(),
          // since particles fall down, skew start toward the top
          y: Math.random() * skew - 0.2,
        },
        colors: ["#ffffff", "#E7F61C", "#5B91D2", "#DE1111"],
        shapes: ["circle"],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.4, 1),
        drift: randomInRange(-0.4, 0.4),
      });

      if (timeLeft > 0) {
        requestAnimationFrame(frame);
      }
    })();
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
