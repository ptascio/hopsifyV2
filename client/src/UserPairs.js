import React from "react";
import "./UserPairs.css";
const axios = require("axios");
const daysOfWeek = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
};

const monthsOfYear = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
};
class UserPairs extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userLikes: [],
      datesSorted: true
    };
    this.reverseDate = this.reverseDate.bind(this);
    this.sortByName = this.sortByName.bind(this);
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

  constructDate(date){
    var d = new Date(date);
    var year = d.getFullYear();
    var month = d.getMonth();
    month = monthsOfYear[month];
    var day = d.getDate();
    var dayOfWeek = d.getDay();
    dayOfWeek = daysOfWeek[dayOfWeek];
    return `${dayOfWeek}, ${month} ${day}, ${year}`;
  }

  reverseDate(){
    var data = this.state.userLikes;
    var returnData;
    if(this.state.datesSorted){
      returnData = true;
    }else{
      returnData = false;
    }
    data = data.sort(function(a,b) {
      var aDate = new Date(a.createdAt);
      var bDate = new Date(b.createdAt);
      aDate = aDate.getTime();
      bDate = bDate.getTime();
      if(returnData){
        return bDate - aDate;
      }else{
        return aDate - bDate;
      }
    });
    this.setState({
      userLikes: data,
      datesSorted: !returnData
    });
  }



  sortByName(name){
    function compare(a,b){
      if(a[`${name}`] < b[`${name}`]){
        return -1;
      }
      if(a[`${name}`] > b[`${name}`]){
        return 1;
      }
      return 0;
    }
    var data = this.state.userLikes;
    var sortedData = data.sort(compare);
    this.setState({
      userLikes: sortedData
    });
  }

  render(){
    let rows = this.state.userLikes.map((pair) => {
      var date = this.constructDate(pair.createdAt);
      return(<tr key={pair._id}>
        <td id={pair._id} onClick={() => {this.removePair(pair._id)}}><img className={"LikedIcon"} src="../images/likedBottle.png" /></td>
        <td>{pair.bandName}</td>
        <td>{pair.trackName}</td>
        <td>{pair.beerName}</td>
        <td>{date}</td>
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
            <th scope="col" onClick={() => {this.sortByName("beerName")}}>Beer</th>
            <th scope="col" onClick={this.reverseDate}>Date Added</th>
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
