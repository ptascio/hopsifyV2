import React from 'react';
import { BrowserRouter as Switch, Redirect, Route } from "react-router-dom";
import { Router } from "react-router-dom";
import {withRouter} from "react-router-dom";
import { createBrowserHistory } from "history";


import './App.css';
import Nav from "./Nav";
import TrackForm from './TrackForm';
import BandInfo from "./BandInfo";
const history = createBrowserHistory();

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
        redirect: !this.state.redirect
      });
  }

  componentDidUpdate(prevProps, nextProps) {
    console.log("nextProps: ");
    console.log(this.state);
  }

  componentWillUnmount() {
      console.log("unmounted");
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

      <Router history={history}>
        <div>

      <Switch>
        <Nav />
        <div>
          <Route path="/form"
            render={(props) => <TrackForm {...props} getBandInfo={(stateValueFromForm) => this.getBandInfo(stateValueFromForm)}/>}
            />
          {this.state.bandInfo && <Route path="/bandInfo"
            render={(props) => <BandInfo {...props} band={this.state.bandStuff}/>}
            />}
            <Route exact path="/form" render={()=>(
              this.state.redirect ? <Redirect to="/bandInfo" /> : null
            )} />
          <Route path="/bandInfo" render={(props)=>(<BandInfo {...props} 
                getBandInfo={(stateValueFromForm) => this.getBandInfo(stateValueFromForm)}
                band={this.state.bandStuff}

                />)} />

</div>



      </Switch>
    </div>
    </Router>
    </div>
  );
}
}


export default withRouter(App);
// export default App;
