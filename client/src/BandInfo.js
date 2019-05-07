import React from 'react';
import { withRouter } from "react-router-dom";

class BandInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      songTitle: "",
      previewUrl: "",
      albumImg: "",
      loudness: "",
      tempo: "",
      danceability: "",
      energy: ""
    };
  }

  componentDidMount(){
    console.log("in bandInfo");
    this.setState({
      songTitle: this.props.band.songTitle,
      previewUrl: this.props.band.previewUrl,
      albumImg: this.props.band.albumImg,
      loudness: this.props.band.loudness,
      tempo: this.props.band.tempo,
      danceability: this.props.band.danceability,
      energy: this.props.band.energy
    }, this.props.getBandInfo("", false));

  }

  render(){
    return(
      <article>
        <h2>Song Info</h2>
        <h3>{this.state.songTitle}</h3>
        <p><a href={this.state.previewUrl}>Hear a Clip </a></p>
        <img src={this.state.albumImg} alt={'album cover for' + this.state.songTitle}/>
        <p>Tempo: {this.state.tempo}</p>
        <p>Loudness: {this.state.loudness}</p>
        <p>Danceability: {this.state.danceability}</p>
        <p>Energy: {this.state.energy}</p>
      </article>
    );
  }
}
export default withRouter(BandInfo);
// export default BandInfo;
