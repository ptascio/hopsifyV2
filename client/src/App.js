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

  getBandInfo(stateValueFromForm) {
      this.setState({bandStuff: stateValueFromForm});
  }

  componentDidUpdate(prevProps, nextState) {
  // Typical usage (don't forget to compare props):
  console.log("in update");
  console.log(prevProps);
  console.log(nextState);
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
      <p>{this.state.bandStuff}</p>
      <Switch>
        <Route path="/form"
          render={(props) => <TrackForm {...props} getBandInfo={(stateValueFromForm) => this.getBandInfo(stateValueFromForm)}/>}
      />

      </Switch>
    </div>
  );
}
}



export default App;
