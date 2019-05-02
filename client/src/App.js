import React from 'react';
import { BrowserRouter as Switch, Router, Route, Link } from "react-router-dom";
import './App.css';
import TrackForm from './TrackForm';
import BandInfo from "./BandInfo";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bandStuff: ""
    };
    this.connectToServer = this.connectToServer.bind(this);
  }

  addSomething(stateValueFromForm) {
        this.setState({fromParent: stateValueFromForm});
  }
  connectToServer(){
    fetch("/");
  }

  componentDidMount(){
    this.connectToServer();
  }
  render(){
    return (

    <div className="App">
      <Switch>
        <Route path="/form" component={TrackForm}/>

      </Switch>
    </div>
  );
}
}

export default App;
