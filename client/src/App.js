import React from 'react';
import { Router, Route, Redirect } from "react-router-dom";
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
      cookieOnWindow: false
    };
    this.connectToServer = this.connectToServer.bind(this);
    this.sendCookieUpdate = this.sendCookieUpdate.bind(this);
  }

  connectToServer(){
    fetch("/");
  }

  checkForCookies(){
    var cookie = document.cookie;
    if(cookie.split("=")[0]==="Hopsify_userId"){
      this.setState({
        cookieOnWindow: true
      });
    }
  }

  sendCookieUpdate(t){
    this.setState({
      cookieOnWindow: t
    });
  }

  componentDidMount(){
    this.checkForCookies();
    this.connectToServer();
  }

  render(){
    if(!this.state.cookieOnWindow){
      return(
        <Router history={history}>
          <div className="App">
           <LoginForm setCookieUpdate={this.sendCookieUpdate}/>
          </div>
        </Router>
      );
    }else{
    return (
<Router history={history}>
  <p>"Rendering true"</p>
    <div className="App">
      <Nav cookies={this.state.cookieOnWindow} setCookieUpdate={this.sendCookieUpdate}/>
            <Route path="/music" component={FormAndInfo} />
            <Route path="/beer" component={Beer} />
      </div>
    </Router>
  );}
}
}


export default App;
// export default App;
