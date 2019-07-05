import React from "react";

class PairLikes extends React.Component {
  render(){
    return(
      <p>LIKES: {this.props.beerName}</p>
    );
  }
}

export default PairLikes;
