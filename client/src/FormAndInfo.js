import React from "react";
import TrackForm from "./TrackForm";
import BandInfo from "./BandInfo";
import { BrowserRouter as Route } from "react-router-dom";
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
        bandStuff: stateValueFromForm,
      });
  }


  render(){

    return(
      <article>
        {this.state.bandInfo ?
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


{/*<Route path="/bandInfo" render={(props)=>(
    <BandInfo {...props}
    getBandInfo={(stateValueFromForm, redirect) => this.getBandInfo(stateValueFromForm, redirect)}
    band={this.state.bandStuff}/>
    )}
  />

 <Route path="/form" render={(props)=>(
     <TrackForm {...props} getBandInfo={(stateValueFromForm, redirect) => this.getBandInfo(stateValueFromForm, redirect)}/>
   )}
   />*/}
