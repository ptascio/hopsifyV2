import React from 'react';
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import './App.css';
import Nav from "./Nav";
import FormAndInfo from "./FormAndInfo";
import Beer from "./Beer";
import LoginForm from "./LoginForm";
const history = createBrowserHistory();

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: ""
    };
    this.connectToServer = this.connectToServer.bind(this);
  }

  connectToServer(){
    fetch("/");
  }

  checkForCookies(){
    console.log("cookies: " + document.cookie);
  }

  componentDidMount(){
    this.connectToServer();
    this.checkForCookies();
  }

  render(){
    return (
<Router history={history}>
    <div className="App">
      <Nav />
            
            <Route path="/login" component={LoginForm} />
            <Route path="/music" component={FormAndInfo} />
            <Route path="/beer" component={Beer} />
      </div>
    </Router>
  );
}
}


export default App;
// export default App;
