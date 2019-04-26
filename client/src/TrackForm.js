import React from 'react';

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
    this.setState({[e.target.name]: [e.target.value]});
  }

  handleSubmit(e){
    e.preventDefault();
    console.log('artistName: ' + this.state.artistName);
    console.log('trackName: ' + this.state.trackName);
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
