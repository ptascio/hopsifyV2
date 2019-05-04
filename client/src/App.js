import React from 'react';
import { BrowserRouter as Switch, Router, Redirect, Route, Link } from "react-router-dom";
import {withRouter} from "react-router-dom";
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


      <Switch>

        <Route path="/form"
          render={(props) => <TrackForm {...props} getBandInfo={(stateValueFromForm) => this.getBandInfo(stateValueFromForm)}/>}
      />
    {this.state.bandInfo && <Route path="/bandInfo"
       render={(props) => <BandInfo {...props} band={this.state.bandStuff}/>}
    />}
    <Route exact path="/form" render={()=>(
              this.state.redirect ? <Redirect to="/bandInfo" /> : null
            )} />
          <Route path="/bandInfo" render={()=>(<BandInfo band={this.state.bandStuff}/>)} />





      </Switch>
    </div>
  );
}
}


export default withRouter(App);
// export default App;
