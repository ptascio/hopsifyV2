import React from 'react';
import { BrowserRouter as Switch, Router, Route, Link } from "react-router-dom";
import { Redirect } from "react-router";
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

  componentDidUpdate(prevProps, nextProps) {
    console.log("nextProps: ");
    console.log(this.state);
  }

// renderRedirect(){
//   if (this.state.redirect) {
//       return <Redirect to='/bandInfo' />;
//   }
// }

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
    {
      this.state.redirect && <Route path="/bandInfo"
        render={(props) => <BandInfo {...props} band={this.state.bandInfo}/>}
    />
    }


      </Switch>
    </div>
  );
}
}



export default App;
