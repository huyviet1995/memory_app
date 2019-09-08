import React from "react";
import $ from "jquery";

export default class Square extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
    }
  }

  getSquareClassName () {
    let clazzName = ["flip-square-inner"]
    if (this.state.isFlipped) {
      clazzName.push("flip-on-click");
    }
    return clazzName.join(" ");
  }

  flipSquare () {
    this.setState({
      isFlipped: !this.state.isFlipped,
    })
  }

  render() {
    const squareStyle = {
      width: this.props.squareWidth,
      height: this.props.squareHeight,
    }
    return (
      <div className = "front-square" style = {squareStyle}>
        <div className = {this.getSquareClassName()} 
          onClick = {this.flipSquare.bind(this)} 
          key = {this.props.coordinate} 
          coordinate = {this.props.coordinate}>

          <div className = 'flip-square-front'></div>
          <div className = 'flip-square-back'></div>
        </div>
      </div>
    ) 
  } 

}
