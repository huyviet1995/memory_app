import React from "react";
import Square from "./Square";

export default class Board extends React.Component {

  constructor(props) {
    super(props);
  }

  _createBoardWithOptions = function(boardRow, boardCol) {
    let board = [];
    for (let i = 0; i < boardRow; i++) {
      let square = [];
      for (let j = 0; j < boardCol; j++) {
        square.push(
          <Square key = {`square ${i}, ${j}`} coordinate = {`[${i}, ${j}]`}></Square>
        )
      }
      board.push(<span className = 'row' key = {`board row ${i}`}>{square}</span>);
    }
    return board; 
  }

  render() {
    return (
      <div className = "main-board">
        {this._createBoardWithOptions(this.props.no_of_rows, this.props.no_of_cols)}
      </div>
    )
  }
} 
