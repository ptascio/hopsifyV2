import React from "react";
import { Redirect, withRouter } from "react-router-dom";

class Beer extends React.Component {

  componentDidMount(){
    if(this.props.location.state){
      console.log("BEER PROPS");
      console.log(this.props.location.state);
      console.log(this.props.location.state.abvPair);
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
