import React from 'react';
import { withRouter } from "react-router-dom";

class BandInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bandString: ""
    };
  }

  componentDidMount(){
    console.log(this.props.history);
    this.setState({
      bandString: this.props.band
    });
  }

  render(){
    return(
      <article>
        <h2>Band Info</h2>
        <p>{this.props.band}</p>
      </article>
    );
  }
}
export default withRouter(BandInfo);
// export default BandInfo;
