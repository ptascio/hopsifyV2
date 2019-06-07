import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Nav extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    console.log(this.props.history);
  }
  render(){
    return(
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/music">Get Started</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Nav);
