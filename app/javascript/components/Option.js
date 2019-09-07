import React from "react";
import PropTypes from 'prop-types';

export default class Option extends React.Component {
  render () {
    return (
      <div className = 'option'>
        <a href = {this.props.linkTo}> {this.props.menuTitle} </a>
      </div>
    );
  }
} 
