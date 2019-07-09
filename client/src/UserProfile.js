import React from "react";
import "./ProfileForm.css";
const axios = require("axios");

class UserProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userName: "",
      email: "",
      newPassword: "",
      userPic: "",
      newUserName: "",
      setUserName: false,
      changeName: false
    };
    this.toggleProfileName = this.toggleProfileName.bind(this);
  }

  componentDidMount(){
    var id = window.sessionStorage.hopsifyUserId;
    var username;
    axios.get(`/api/fetch-user/${id}`).then((response) => {
      if(!response.data.userName){
        username = "You still need to set your username.";
      }else{
        username = response.data.username;
      }
      this.setState({
        email: response.data.email,
        userName: username,
        setUserName: true
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  toggleProfileName(){
    this.setState({
      changeName: !this.state.changeName
    });
  }

  render(){
    var nameButton = this.state.setUserName ? <button onClick={this.toggleProfileName}>Set profile name</button> : <button>Edit profile name</button> ;
    var profileNameClass = this.state.changeName ? "ChangeName" : "HideChangeName";
    var displayProfileName = this.state.changeName ? "HideProfileName" : "ShowProfileName";
    return(
      <section>
        <h1>Profile</h1>
        <p>Email: {this.state.email}</p>
        <div className={displayProfileName}>
        <p>Name: {this.state.userName}</p>{nameButton}
        </div>
        <form className={profileNameClass}>
          <label>
            Name:
            <input name="newUserName" type="text" value={this.state.newUserName} />
          </label>
        </form>
      </section>
    );
  }
}

export default UserProfile;
