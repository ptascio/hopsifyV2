import React from "react";
import TrackForm from "./TrackForm";
import BandInfo from "./BandInfo";
import { withRouter } from "react-router-dom";

class FormAndInfo extends React.Component {
  render(){
    return(
      <article>
        <TrackForm />
        <BandInfo />
      </article>
    );
  }
}

export default withRouter(FormAndInfo);
