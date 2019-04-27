import React from 'react';
import './App.css';
import TrackForm from './TrackForm';

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

      <TrackForm />
    </div>
  );
}
}

export default App;
