import React from 'react';

export default class Square extends React.Component {

  render() {
    return (
      <div className = "front-square">
        <div className = "flip-square-inner" coordinate = {this.props.coordinate}>
          <div className = 'flip-square-front'></div>
          <div className = 'flip-square-back'></div>
        </div>
      </div>
    ) 
  } 

}