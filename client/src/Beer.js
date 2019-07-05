import React from "react";
import { Redirect, withRouter } from "react-router-dom";
const axios = require("axios");
const punkAPI = "https://api.punkapi.com/v2/beers/";


class Beer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      beerName: "",
      beerImg: "",
      beerDescription: "",
      beerStyleDescription: ""
    };
  }
  componentDidMount(){
    if(this.props.location.state){
      var abv = this.props.location.state.abvPair;
      var upperAbv = abv+1;
      // var endPoint = `${punkAPI}?per_page=3&abv_gt=${abv}&abv_lt=${upperAbv}`;
      // axios.get(breweryDB).then((response) => {
      //   console.log(response.data[0]);
      //   window.beerData = response.data;
      //   this.setState({
      //     beerName: response.data[0].name,
      //     beerImg: response.data[0].image_url,
      //     beerDescription: response.data[0].description
      //   });
      // });
      axios.get("/api/beer", {
        params: {
          abv: abv,
          abv2: upperAbv
        }
      }).then((resp) => {
        var beerData = resp.data;
        console.log("beerData");
        console.log(beerData);
        var picture = "/images/Bader-in-Office-Space-400x300.gif";
        if(beerData.labels){
          console.log(beerData.labels.medium);
          picture = beerData.labels.medium;
        }
        this.setState({
          beerName: beerData.nameDisplay,
          beerStyleDescription: beerData.style.description,
          beerImg: `${picture}`,
          beerDescription: beerData.description
        });
      }).catch((err) => {
        console.log(err);
      });
    }else{
      console.log("false");
    }
  }

  render(){
    var scope = {
      imageStyle: {
        height: 400,
      },
      pStyle: {
        width: 400,
        margin: "auto"
      }
    };
    if(!this.props.location.state){
      return <Redirect to= {{
        pathname: "/music",
        state: {noMetric: "You can't match beers until there is a match!"}
      }}/>;
    }

    return(
      <div>
        <p>Showing match result for {this.props.location.state.trackName} by {this.props.location.state.artistName}:</p>
        <h1>{this.state.beerName}</h1>
        <img style={scope.imageStyle} src={this.state.beerImg} alt={this.state.beerName + " logo"}/>
        <p style={scope.pStyle}>{this.state.beerStyleDescription}</p>
      </div>
    );
  }
}

export default withRouter(Beer);
