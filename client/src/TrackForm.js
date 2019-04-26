import React from 'react';
const axios = require("axios");

class TrackForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      trackName: '',
      artistName: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      console.log(response);
    });

  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>Artist Name:
          <input name="artistName" type="text" onChange={this.handleChange}/>
        </label><br />
        <label>Track Name:
          <input name="trackName" type="text" onChange={this.handleChange}/>
        </label><br />
          <input type="submit" value="Submit"/>
      </form>
    );
  }
}

export default TrackForm;
