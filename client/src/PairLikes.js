import React from "react";
const axios = require("axios");

class PairLikes extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      likes: ""
    };
  }


  componentDidMount(){
    console.log("getting the pair likes now");
    console.log(this.props);
    axios.get(`/api/findPairs/${this.props.band}/${this.props.track}/${this.props.beerName}`).then((res) => {
        this.setState({
          likes: res.data
        });
    }).catch((err) => {
      console.log(err);
    });
  }
  render(){
    return(
      <p>LIKES: {this.state.likes}</p>
    );
  }
}

export default PairLikes;
