import React from "react";
import "./UserPairs.css";
const axios = require("axios");

class UserPairs extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userLikes: []
    };
  }

  componentDidMount(){
    this.fetchPairs();
  }

  fetchPairs(){
    var userId = window.sessionStorage.hopsifyUserId;
    axios.get(`/api/userPairs/${userId}`).then((res) => {
      this.setState({
        userLikes: res.data
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  removePair(id){
    axios.delete(`/api/removePair/${id}`).then((res) => {
      this.fetchPairs();
    }).catch((err) => {
      console.log(err);
    });
  }

  render(){
    let rows = this.state.userLikes.map((pair) => {
      return(<tr key={pair._id}>
        <td id={pair._id} onClick={() => {this.removePair(pair._id)}}><img className={"LikedIcon"} src="../images/likedBottle.png" /></td>
        <td>{pair.bandName}</td>
        <td>{pair.trackName}</td>
        <td>{pair.beerName}</td>
      </tr>);
    });
    return(
      <section>
        <h2>Your Pairs</h2>
        <table>
          <thead>
          <tr>
            <th scope="col">Delete</th>
            <th scope="col">Band</th>
            <th scope="col">Track</th>
            <th scope="col">Beer</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
        </table>
      </section>
    );
  }
}

export default UserPairs;
