import React from "react";
import Option from './Option';

export default class Header extends React.Component {

  render() {
    return (
      <nav className = "header navbar navbar-fixed-top navbar-text sticky-top navbar-collapse">
        <div className = "container">
          <div className = "logo">
            <Option menuTitle = "TEST YOUR MEMORY" linkTo = "/"></Option>
          </div>
          <div className = 'menu'>
            <Option menuTitle = "MAIN" linkTo = '/'></Option>
            <Option menuTitle = "HELP" linkTo = '/tutorial'></Option>
            <Option menuTitle = "ABOUT" linkTo = '/about'></Option>
            <Option menuTitle = "LOGIN" linkTo = '/login'></Option>
          </div>
        </div>
      </nav>
    ) 
  }
}
