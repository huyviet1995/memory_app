var React = require('react');
var PropTypes = require('prop-types')

export default class Post extends React.Component {
  render() {
    return <h1>{this.props.title}</h1>
  }
}

Post.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string  
};

