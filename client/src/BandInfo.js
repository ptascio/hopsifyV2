import React from 'react';

class BandInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bandString: ""
    };
  }

  componentDidMount(){
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

export default BandInfo;
