import React from "react";
import './PairLikes.css';
const axios = require("axios");



class PairLikes extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      likes: "",
      userLiked: "",
      band: "",
      track: "",
      userId: ""
    };

    this.upVote = this.upVote.bind(this);
  }


  componentDidMount(){
    console.log("getting the pair likes now");
    console.log(this.props);
    var userId = window.sessionStorage.hopsifyUserId;
    this.setState({
      band: this.props.band,
      track: this.props.track,
      beerName: this.props.beerName,
      userId: `${userId}`
    });
    const promises = Promise.all([
      axios.get(`/api/findPairs/${this.props.band}/${this.props.track}/${this.props.beerName}`),
      axios.get(`/api/findIfUserLiked/${this.props.band}/${this.props.track}/${this.props.beerName}/${userId}`)
    ]).then((values)=> {
      var likes = values[0].data;
      var userLiked = values[1].data;
      this.setState({
        likes: `${likes}`,
        userLiked: `${userLiked}`
      });
    }).catch((err) => {
      console.log(err);
    });
  }
  upVote(){
    var userId = window.sessionStorage.hopsifyUserId;
    axios.post(`/api/upVote/${this.state.band}/${this.state.track}/${this.state.beerName}/${userId}`).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }
  render(){
    var backGround;
    console.log(this.state);
    if(this.state.userLiked !== "null"){
      backGround = "ButtonStyle AlreadyUpVoted";
    }else{
      backGround = "ButtonStyle";
    }

    return(
      <section>
      <button onClick={this.upVote} className={backGround}><img className="IconStyle" alt="Up vote icon" src="/images/upVote.png"/></button>
      0
      <button className="ButtonStyle"><img className="IconStyle" alt="Down vote icon" src="/images/downVote.png"/></button>
      <p>LIKES: {this.state.likes}</p>
      </section>
    );
  }
}

export default PairLikes;
