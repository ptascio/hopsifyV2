import React from 'react';
import { BrowserRouter as Switch, Router, Route, Link } from "react-router-dom";
import './App.css';
import TrackForm from './TrackForm';
import BandInfo from "./BandInfo";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.connectToServer = this.connectToServer.bind(this);
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
        <Route path="/bandInfo" component={BandInfo} />
      </Switch>
    </div>
  );
}
}

export default App;
