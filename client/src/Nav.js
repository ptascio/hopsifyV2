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
    console.log("in nav: " + this.props.cookies);
    this.setState({
      cookie: this.props.cookies
    });
  }

  logout(){
    var now = new Date();
    document.cookie = `Hopsify_userId=;expires=${now}`;
    this.props.setCookieUpdate(false);
  }
  render(){
    if(this.state.cookie === true){
      return(
        <nav>
          <h1><a href="/">Hopsify</a></h1>
          <img class="logo" src="../images/hopsifyLogo1.png" alt=""/>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="/music">Search</a>
            </li>
            <li>
              <Link to="/pairs">Pairs</Link>
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
          <h1><a href="/">Hopsify</a></h1>
          <img class="logo" src="../images/hopsifyLogo1.png" alt=""/>
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
