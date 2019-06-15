import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import axios from "axios";
const punkAPI = "https://api.punkapi.com/v2/beers/";
class Beer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      beerMatch: ""
    };
  }
  componentDidMount(){
    if(this.props.location.state){
      console.log("BEER PROPS");
      console.log(this.props.location.state);
      var abv = this.props.location.state.abvPair;
      var upperAbv = abv+1;
      var endPoint = `${punkAPI}?per_page=1&abv_gt=${abv}&abv_lt=${upperAbv}`;
      axios.get(endPoint).then((response) => {
        console.log(response.data[0]);
      });
    }else{
      console.log("false");
    }
  }

  render(){
    if(!this.props.location.state){
      return <Redirect to= {{
        pathname: "/music",
        state: {noMetric: "You can't match beers until there is a match!"}
      }}/>;
    }
    return(
      <div>
        Some Beers
      </div>
    );
  }
}

export default withRouter(Beer);
