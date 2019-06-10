import React from "react";
import TrackForm from "./TrackForm";
import BandInfo from "./BandInfo";

import { withRouter } from "react-router-dom";

class FormAndInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        bandInfo: "",
        noBeerMatch: ""
      };
  }

  getBandInfo(stateValueFromForm) {
    console.log("form: " + stateValueFromForm);
      this.setState({
        bandInfo: stateValueFromForm
      });
  }

  componentDidMount(){
    if(this.props.location.state){
        this.setState({
          noBeerMatch: this.props.location.state.noMetric
        });
    }

  }


  render(){
    console.log(this.state);
    return(
      <article>
        <p>{this.state.noBeerMatch}</p>
        {this.state.bandInfo.songTitle ?
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
