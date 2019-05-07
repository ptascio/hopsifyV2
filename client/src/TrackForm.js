import React from 'react';
// import { BrowserRouter as Route } from "react-router-dom";

// import BandInfo from "./BandInfo";
const axios = require("axios");


class TrackForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      trackName: '',
      artistName: '',
      bandInfo: "",
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendToBandInfo = this.sendToBandInfo.bind(this);
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    axios({
      url: "/api/track",
      method: "get",
      params: {
        artistName: this.state.artistName,
        trackName: this.state.trackName
      }
    }).then((response) => {
      console.log("in response form");
      var band = JSON.stringify(response.data);
      var redirect = this.parseError(band);
      this.setState({
        bandInfo: band,
        submitted: true,
        trackName: "",
        artistName: ""
      }, (stuff) => this.props.getBandInfo(this.state.bandInfo, redirect));
    });
  }

  parseError(response){
    if(response === "\"Sorry, something went wrong. Did you fill in both fields?\""){
      return false;
    }else{
      return true;
    }
  }

  sendToBandInfo(){
    this.props.history.push("/bandInfo");
  }

  render(){
    return(
      <div>
        {this.state.submitted}
      <form onSubmit={this.handleSubmit}>
        <label>Artist Name:
          <input name="artistName" type="text" value={this.state.artistName} onChange={this.handleChange}/>
        </label><br />
        <label>Track Name:
          <input name="trackName" type="text" value={this.state.trackName} onChange={this.handleChange}/>
        </label><br />
          <input type="submit" value="Submit"/>
      </form>
    </div>
    );
  }
}

// export default withRouter(observer(MyComponent))
export default TrackForm;
