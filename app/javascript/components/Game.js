import React from "react";
import Board from "./Board";

export default class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      no_of_cols: this.props.no_of_cols,
      no_of_rows: this.props.no_of_rows,
      current_lvl: this.props.current_lvl, 
      current_score: this.props.current_score,
      lives_count: this.props.lives_count, 
    }
  }

  render() {
    return (
      <div className = "game-section" key = {1}>
        <input type = "hidden" name = "no-of-cols" value = {this.props.no_of_cols}/>
        <input type = "hidden" name = "no-of-rows" value = {this.props.no_of_rows}/>
        <input type = "hidden" name = "current-level" value = {this.props.current_lvl}/>
        <input type = "hidden" name = "current-score" value = {this.props.current_score}/>
        <input type = "hidden" name = "lives-count" value = {this.props.lives_count}/>
        <Board no_of_cols = {this.props.no_of_cols} no_of_rows = {this.props.no_of_rows}></Board>
      </div>
    )
  }
} 