import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import "./Board.css";

let permittedKeys = [
  "ArrowUp",
  "KeyW",
  "ArrowRight",
  "KeyD",
  "ArrowDown",
  "KeyS",
  "ArrowLeft",
  "KeyA",
];

const boardSize = 4;

function Board(props) {
  const [grid, _setGrid] = useState();

  const gridRef = React.useRef(grid);
  const setGrid = (board) => {
    gridRef.current = board;
    _setGrid(board);
  };
  //Event listener for handling keypress. Event handlers can't use updated state values directly and therefore useRef hook has to be used
  const handleKeyDown = (e) => {
    //If pressed key is not a valid game control key ignore the keydown event
    if (permittedKeys.indexOf(e.code) === -1) return;
    //Else
    else if (gridRef.current) {
      const updatedBoard = performMove(
        e.code,
        gridRef.current,
        boardSize,
        props.handleScore
      );
      if (updatedBoard) setGrid(generateNext(updatedBoard, boardSize));
    }
  };

  //creating a 4x4 board when component mounts
  //Note: Always add event listeners when a component mounts. Doing it inside the functional component's body re-renders exponentially
  useEffect(() => {
    const board = getBoard(boardSize);
    setGrid(board);
    window.addEventListener("keydown", handleKeyDown);
    //cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  //function that renders all the 4x4 cells
  // CORRECTION - Give every cell a key
  const renderCells =
    grid &&
    grid.map((row, i) =>
      row.map((col, j) => <Cell key={i * boardSize + j} value={grid[i][j]} />)
    );

  return <div className="board">{renderCells}</div>;
}

const performMove = (pressedKey, _board, boardSize, handleScore) => {
  //Move cells in pressedKey-direction till they hit another block
  //Eg:When left key is pressed
  //256 empty 256 64 becomes
  //256 256 64 empty
  // const _board = [..._board];
  let scoreUpdates = 0;
  let board = [];
  for (let i = 0; i < boardSize; ++i) {
    const row = [..._board[i]];
    board.push(row);
  }

  let up = false,
    down = false,
    left = false,
    right = false;

  //check which key was proved and set the appropriate boolean flag to perform the corresponding move
  switch (pressedKey) {
    case permittedKeys[0]:
    case permittedKeys[1]:
      up = true;
      break;
    case permittedKeys[2]:
    case permittedKeys[3]:
      right = true;
      break;
    case permittedKeys[4]:
    case permittedKeys[5]:
      down = true;
      break;
    case permittedKeys[6]:
    case permittedKeys[7]:
      left = true;
      break;
  }

  //Function that groups all elements in a row together
  const groupRow = (row) => {
    const newRow = [];
    for (let j = 0; j < boardSize; ++j) {
      if (row[j]) newRow.push(row[j]);
    }
    let remainingSpaces = boardSize - newRow.length;
    while (remainingSpaces--) {
      if (left) newRow.push(0);
      else newRow.unshift(0);
    }
    return newRow;
  };

  const groupCol = (board_temp) => {
    for (let j = 0; j < boardSize; ++j) {
      const newCol = [];
      for (let i = 0; i < boardSize; ++i) {
        if (board_temp[i][j]) newCol.push(board_temp[i][j]);
      }
      let remainingSpaces = boardSize - newCol.length;
      while (remainingSpaces--) {
        if (up) newCol.push(0);
        else newCol.unshift(0);
      }

      for (let i = 0; i < boardSize; ++i) board_temp[i][j] = newCol[i];
    }

    return board_temp;
  };

  //Handle left or right moves
  if (left || right) {
    for (let i = 0; i < boardSize; ++i) {
      let newRow = groupRow(board[i]);

      //Merge cells for a left move
      if (left) {
        for (let x = 0; x < boardSize - 1; ++x) {
          if (newRow[x] === newRow[x + 1]) {
            newRow[x] *= 2;
            scoreUpdates += newRow[x];
            newRow[x + 1] = 0;
          }
        }
      }
      //Merge cells for a right move
      else {
        for (let x = boardSize; x > 0; --x) {
          if (newRow[x] === newRow[x - 1]) {
            newRow[x] *= 2;
            scoreUpdates += newRow[x];
            newRow[x - 1] = 0;
          }
        }
      }
      newRow = groupRow(newRow);
      board[i] = newRow;
    }
  }
  //Handle up or down moves
  else {
    board = groupCol(board);
    for (let j = 0; j < boardSize; ++j) {
      //Up move
      if (up)
        for (let i = 0; i < boardSize - 1; ++i) {
          if (board[i][j] && board[i][j] === board[i + 1][j]) {
            board[i][j] *= 2;
            scoreUpdates += board[i][j];
            board[i + 1][j] = 0;
          }
        }
      //Down move
      else
        for (let i = boardSize - 1; i > 0; --i) {
          if (board[i][j] && board[i][j] === board[i - 1][j]) {
            board[i][j] *= 2;
            scoreUpdates += board[i][j];
            board[i - 1][j] = 0;
          }
        }
    }
    board = groupCol(board);
  }
  if (JSON.stringify(_board) === JSON.stringify(board)) return false;

  debugger;
  handleScore(scoreUpdates);
  return board;
};

//generate the next cell after the player performs a move
function generateNext(board, boardSize) {
  const available = [];
  for (let i = 0; i < boardSize; ++i)
    for (let j = 0; j < boardSize; ++j)
      if (!board[i][j]) available.push(i * boardSize + j);

  let el = Math.floor(Math.random() * available.length);
  let i = Math.floor(available[el] / boardSize);
  let j = Math.floor(available[el] % boardSize);

  board[i][j] = Math.random() < 0.9 ? 2 : 4;
  return board;
}

function getBoard(boardSize) {
  let board = [];
  for (let i = 0; i < boardSize; ++i) {
    const row = [];
    for (let j = 0; j < 4; ++j) row.push(0);
    board.push(row);
  }
  //generating two random starting cells
  let i1 = Math.floor(Math.random() * boardSize);
  let j1 = Math.floor(Math.random() * boardSize);
  let i2, j2;
  do {
    i2 = Math.floor(Math.random() * boardSize);
    j2 = Math.floor(Math.random() * boardSize);
  } while (i1 === i2 && j1 === j2);

  board = generateNext(board, boardSize);
  board = generateNext(board, boardSize);

  return board;
}

export default React.memo(Board);
