import React from "react"
import PropTypes from "prop-types"

class HelloWorld extends React.Component {
  render () {
    return (
      <h1>
        My name is Viet, nice to meet yo: {this.props.greeting}
      </h1>
    );
  }
}

export default HelloWorld;


HelloWorld.propTypes = {
  greeting: PropTypes.string
};

