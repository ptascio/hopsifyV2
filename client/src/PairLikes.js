// axios.get(`/api/findPairs/${this.props.band}/${this.props.track}/${this.props.beerName}`),
// axios.get(`/api/findIfUserLiked/${this.props.band}/${this.props.track}/${this.props.beerName}/${userId}`)

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
    this.downVote = this.downVote.bind(this);
    this.voteClick = this.voteClick.bind(this);
    this.nullVote = this.nullVote.bind(this);
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
      axios.get(`/api/findPairs/metallica/Sad But True/T.L.A. I.P.A.`),
      axios.get(`/api/findIfUserLiked/metallica/Sad But True/T.L.A. I.P.A./5d13e91c3ffe146c6c2a84f2`)
    ]).then((values)=> {
      var likes = values[0].data;
      var userLiked = values[1].data;
      console.log(values[1].data);
      this.setState({
        likes: `${likes}`,
        userLiked: `${userLiked}`
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  fetchLikes(){
    const promises = Promise.all([
      axios.get(`/api/findPairs/${this.state.band}/${this.state.track}/${this.state.beerName}`),
      axios.get(`/api/findIfUserLiked/${this.state.band}/${this.state.track}/${this.state.beerName}/${this.state.userId}`)
    ]).then((values)=> {
      var likes = values[0].data;
      var userLiked = values[1].data;
      console.log(values[1].data);
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
      this.fetchLikes();
    }).catch((err) => {
      console.log(err);
    });
  }

  downVote(){
    axios.delete(`/api/downVote/${this.state.band}/${this.state.track}/${this.state.beerName}/${this.state.userId}`).then((res) => {
      this.fetchLikes();
    }).catch((err) => {
      console.log(err);
    });
  }

  voteClick(n){
    if(n === "down"){
      this.downVote();
    }else{
      this.upVote();
    }
  }

  nullVote(){
    console.log("null");
  }
  render(){
    var backGround;
    var voterClick;
    var downVoteClick;
    var imgSource;
    console.log(this.state);
    if(this.state.userLiked === "already liked"){
      backGround = "ButtonStyle";
      imgSource = "/images/likedBottle.png";
      voterClick = () => {this.voteClick("down");};
    }else{
      backGround = "ButtonStyle";
      imgSource = "/images/emptyBottle.png";
      voterClick = () => {this.voteClick("up");};
    }

    return(
      <section>
      <button onClick={voterClick} className={backGround}><img className="IconStyle" alt="Up vote icon" src={imgSource}/></button>
      <p>LIKES: {this.state.likes}</p>
      </section>
    );
  }
}

export default PairLikes;
