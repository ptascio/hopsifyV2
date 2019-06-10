import React from "react";
import { withRouter } from "react-router-dom";

class Beer extends React.Component {
  render(){
    return(
      <div>
        Some Beers
      </div>
    );
  }
}

export default withRouter(Beer);
