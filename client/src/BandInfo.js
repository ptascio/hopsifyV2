import React from 'react';
import { Redirect, withRouter } from "react-router-dom";

class BandInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      songTitle: this.props.band.songTitle,
      previewUrl: this.props.band.previewUrl,
      albumImg: this.props.band.albumImg,
      loudness: this.props.band.loudness,
      valence: this.props.band.valence,
      tempo: this.props.band.tempo,
      danceability: this.props.band.danceability,
      energy: this.props.band.energy,
      artistId: this.props.band.artistId,
      artistName: this.props.band.artistName,
      resetForm: this.props.getBandInfo,
      abv: 5,
      pushToBeers: false
    };

  }

  matchBeers() {
    console.log(this);
    this.setState({
      pushToBeers: true
    });
  }

  componentDidMount(){
    console.log(this.props);
      window.sessionStorage.trackName = this.state.songTitle;
      window.sessionStorage.artistId = this.state.artistId;
  }

  render(){
    var clip;
    if (this.state.previewUrl){
      clip = <p><a href={this.state.previewUrl}>Hear a Clip </a></p>;
    }else{
      clip = <span></span>;
    }
    var goMatchBeers;
    if(this.state.pushToBeers) {return<Redirect to={{
        pathname: "/beer",
        state: {
          abvPair: this.state.abv,
          trackName: this.state.songTitle,
          artistName: this.state.artistName,
          artistId: this.state.artistId
        }
        }}/>;}

    return(
      <article>
        <div>
          <h2>Song Info</h2>
          <h3>{this.state.songTitle}</h3>
          <button onClick={() => this.matchBeers()}>Match Beers</button>
          {clip}
          <button onClick={() => this.state.resetForm("")}>New Search</button>
          <img src={this.state.albumImg} alt={'album cover for' + this.state.songTitle}/>
          <p>Valence: {this.state.valence}</p>
          <p>Tempo: {this.state.tempo}</p>
          <p>Loudness: {this.state.loudness}</p>
          <p>Danceability: {this.state.danceability}</p>
          <p>Energy: {this.state.energy}</p>
          <p>Abv: {this.state.abv}</p>
        </div>
      </article>
    );
  }
}
export default withRouter(BandInfo);
// export default BandInfo;
