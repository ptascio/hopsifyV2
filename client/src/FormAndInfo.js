import React from "react";
import TrackForm from "./TrackForm";
import BandInfo from "./BandInfo";

import { withRouter } from "react-router-dom";

class FormAndInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        bandInfo: ""
      };
  }

  getBandInfo(stateValueFromForm) {
      this.setState({
        bandInfo: stateValueFromForm,
      });
  }


  render(){

    return(
      <article>
        {this.state.bandInfo.trackName ?
          <BandInfo band={this.state.bandInfo}
            getBandInfo={(stateValueFromForm) => this.getBandInfo(stateValueFromForm)}
          /> :
          <TrackForm
            getBandInfo={(stateValueFromForm) => this.getBandInfo(stateValueFromForm)}
          />}

      </article>
    );
  }
}

export default withRouter(FormAndInfo);
