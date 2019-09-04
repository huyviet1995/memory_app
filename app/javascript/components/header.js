import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render () {
    return (
      <nav className = "header navbar navbar-fixed-top navbar-text sticky-top navbar-collapse">
        <div className = "container">
          <div className = 'menu'>
            <Option menuTitle = "Main" linkTo = '/'/>
            <Option menuTitle = "Help" linkTo = '/tutorial'/>
            <Option menuTitle = "About" linkTo = '/about'/>
            <Option menuTitle = "Login" linkTo = '/login'/>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header;

Header.propTypes = {}