import React from 'react';
import { BrowserRouter as Switch, Redirect, Router, Route, Link } from "react-router-dom";
import './App.css';
import TrackForm from './TrackForm';
import BandInfo from "./BandInfo";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bandStuff: "",
      redirect: false
    };
    this.connectToServer = this.connectToServer.bind(this);
  }

  getBandInfo(stateValueFromForm) {
      this.setState({
        bandStuff: stateValueFromForm,
        redirect: true
      });
  }

  componentDidUpdate(prevProps, nextState) {
  // Typical usage (don't forget to compare props):
  console.log("in update");
  console.log(this.state.redirect);
  if(this.state.redirect){
    return <Redirect to='/bandInfo' />;
  }
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
    <Route path="/bandInfo"
        render={(props) => <BandInfo {...props} band={this.state.bandInfo}/>}
    />

      </Switch>
    </div>
  );
}
}



export default App;
