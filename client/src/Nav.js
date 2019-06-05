import React from 'react';
import { BrowserRouter as Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Nav extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    console.log(this.props);
  }
  render(){
    return(
      <nav>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>

            <Link to="/form">FORM</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Nav);
