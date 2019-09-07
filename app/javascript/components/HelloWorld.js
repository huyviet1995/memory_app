import React from "react"

class HelloWorld extends React.Component {
  render () {
    return (
      <h1>
        My name is Viet, nice to meet yo: {this.props.greeting}
      </h1>
    );
  }
}



