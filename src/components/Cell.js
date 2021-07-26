import React from "react";
import "./Cell.css";

function Cell(props) {
  return <div className="cell"><div>{props.value !== 0 && props.value}</div></div>;
}

export default React.memo(Cell);
