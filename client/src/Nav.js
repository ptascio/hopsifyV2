import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Nav extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    console.log(this.props.history);
  }

  logout(){
    document.cookie = "whatevs=cookie";
    console.log(document.cookie);
  }
  render(){
    if(document.cookie){
      return(
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/music">Search</Link>
            </li>
            <li>
              <Link to="/logout" onClick={this.logout}>Logout</Link>
            </li>
          </ul>
        </nav>
      );
    }else{
      return(
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      );
    }

  }
}

export default withRouter(Nav);
