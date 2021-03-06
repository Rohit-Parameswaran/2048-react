import React from "react";
import "./Cell.css";
import images from "./images/images";

function Cell(props) {
  return (
    <div className={`cell ${props.value && "tile"}`}>
      {props.value !== 0 && <img src={images[props.value]} alt="2048 tile"/>}
    </div>
  );
}

export default React.memo(Cell);
