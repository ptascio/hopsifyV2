import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Nav extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cookie: ""
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    this.setState({
      cookie: this.props.cookies
    });
  }

  logout(){
    var now = new Date();
    document.cookie = `Hopsify_userId=;expires=${now}`;
    
  }
  render(){
    if(this.state.cookie){
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
