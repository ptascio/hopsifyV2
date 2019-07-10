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
      changeName: false,
      userId: ""
    };
    this.toggleProfileName = this.toggleProfileName.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.upDateUsername = this.upDateUsername.bind(this);
  }

  componentDidMount(){
    var id = window.sessionStorage.hopsifyUserId;
    var username;
    axios.get(`/api/fetch-user/${id}`).then((response) => {
      console.log(response.data);
      if(!response.data.userName){
        username = "You still need to set your username.";
      }else{
        username = response.data.userName;
      }
      this.setState({
        email: response.data.email,
        userName: username,
        userId: id,
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
  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });

  }
  upDateUsername(e){
    e.preventDefault();
    axios.patch(`/api/changeName/${this.state.userId}/${this.state.newUserName}`).then((response) => {
      this.setState({
        userName: response.data.userName,
        setUserName: false,
        changeName: false,
        newUserName: ""
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  render(){
    var nameButton = this.state.setUserName ? <button onClick={this.toggleProfileName}>Set profile name</button> : <button onClick={this.toggleProfileName}>Edit profile name</button> ;
    var profileNameClass = this.state.changeName ? "ChangeName" : "HideChangeName";
    var displayProfileName = this.state.changeName ? "HideProfileName" : "ShowProfileName";
    return(
      <section>
        <h1>Profile</h1>
        <p>Email: {this.state.email}</p>
        <div className={displayProfileName}>
        <p>Name: {this.state.userName}</p>{nameButton}
        </div>
        <form className={profileNameClass} onSubmit={(event) => this.upDateUsername(event)}>
          <label>
            New Profile Name:
            <input name="newUserName" type="text" value={this.state.newUserName} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Save Name" />
        </form>
      </section>
    );
  }
}

export default UserProfile;
