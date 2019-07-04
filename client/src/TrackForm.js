import React from 'react';
import { withRouter } from "react-router-dom";
// import BandInfo from "./BandInfo";
const axios = require("axios");


class TrackForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      trackName: '',
      artistName: '',
      bandInfo: "",
      submitted: false,
      formError: "",

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    var userId = document.cookie.split("=")[1];
    if(this.state.artistName || this.state.trackName){
      axios({
        url: "/api/track",
        method: "get",
        params: {
          artistName: this.state.artistName,
          trackName: this.state.trackName,
          userId: userId
        }
      }).then((response) => {
        console.log("in response form");
        var band = response.data;
        this.parseError(band);
        this.setState({
          bandInfo: band,
          submitted: true,
          trackName: "",
          artistName: ""
        }, () => this.props.getBandInfo(this.state.bandInfo));
      });
    }else{
      this.setState({
        formError: "Please fill out at least one field."
      });
    }
  }

  componentWillUnmount() {
      console.log("track form unmounted");
      this.setState({
        band: "",
        submitted: false,
        trackName: "",
        artistName: ""
      });
   }

  parseError(response){
    if(response === "Sorry, something went wrong."){
      this.setState({
        formError: `Sorry, something went wrong. Looks like we can't find match. You entered ${this.state.artistName} and ${this.state.trackName}.`
      });
    }else{
      return true;
    }
  }

  render(){
    var displayForm;

      displayForm = <div>
        <p>{this.state.formError}</p>
      <form onSubmit={this.handleSubmit}>
        <label>Artist Name:
          <input name="artistName" type="text" value={this.state.artistName} onChange={this.handleChange}/>
        </label><br />
        <label>Track Name:
          <input name="trackName" type="text" value={this.state.trackName} onChange={this.handleChange}/>
        </label><br />
          <input type="submit" value="Submit"/>
      </form>
    </div>;

    return(
      <article>
      {displayForm}
    </article>

    );
  }
}

// export default withRouter(observer(MyComponent))
export default withRouter(TrackForm);
