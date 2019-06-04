import React from 'react';
import { withRouter } from "react-router-dom";

class BandInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      songTitle: props.band.songTitle,
      previewUrl: props.band.previewUrl,
      albumImg: props.band.albumImg,
      loudness: props.band.loudness,
      tempo: props.band.tempo,
      danceability: props.band.danceability,
      energy: props.band.energy
    };
  }

  componentDidMount(){
    console.log("in bandInfo");
    this.props.getBandInfo("", false);

  }

  render(){
    var clip;
    if (this.state.previewUrl){
      clip = <p><a href={this.state.previewUrl}>Hear a Clip </a></p>;
    }else{
      clip = <span></span>;
    }
    return(
      <article>
        <h2>Song Info</h2>
        <h3>{this.state.songTitle}</h3>
        {clip}
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
