import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import './App.css';
import Nav from "./Nav";
import FormAndInfo from "./FormAndInfo";
const history = createBrowserHistory();

class App extends React.Component {
  constructor(props){
    super(props);
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
<Router history={history}>
    <div className="App">
            <Route exact path="/" component={Nav} />
            <Route path="/music" component={FormAndInfo} />
      </div>
    </Router>
  );
}
}


export default App;
// export default App;
