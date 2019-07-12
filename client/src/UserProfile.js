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
      setUserName: "",
      changeName: false,
      changeEmail: false,
      userId: ""
    };
    this.toggleProfileName = this.toggleProfileName.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.upDateUsername = this.upDateUsername.bind(this);
  }

  componentDidMount(){
    var id = window.sessionStorage.hopsifyUserId;
    var username;
    var setusername;
    axios.get(`/api/fetch-user/${id}`).then((response) => {
      if(!response.data.userName){
        username = "You still need to set your username.";
        setusername = true;
      }else{
        username = response.data.userName;
        setusername = false;
      }
      this.setState({
        email: response.data.email,
        userName: username,
        userId: id,
        changeName: setusername
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  toggleProfileName(t){
    console.log(t);
    this.setState({
      [`${t}`]: !this.state[`${t}`]
    });
  }
  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });

  }
  upDateUsername(e){
    e.preventDefault();
    if(this.state.newUserName.length > 0){
      axios.patch(`/api/changeName/${this.state.userId}/${this.state.newUserName}`).then((response) => {
        this.setState({
          userName: response.data.userName,
          setUserName: false,
          changeName: false,
          newUserName: ""
        });
      }). catch((err) => {
        console.log(err);
      });
    }else{
      alert("Username cannot be empty");
    }
  }

  render(){
    var nameButton = this.state.changeName ? <button onClick={() => this.toggleProfileName("changeName")}>Set profile name</button> : <button onClick={() => this.toggleProfileName("changeName")}>Edit profile name</button>;
    var emailButton = <button onClick={() => this.toggleProfileName("changeEmail")}>Edit profile email</button>;
    var closeButton = this.state.changeName ? <button type="button" onClick={() => this.toggleProfileName("changeName")}>Close Form</button> : <button type="button" onClick={() => this.toggleProfileName("changeEmail")}>Close Form</button>;
    var profileClass = this.state.changeName ? "ChangeName" : "HideChangeName";
    var displayProfileName = this.state.changeName ? "HideProfileName" : "ShowProfileName";
    return(
      <section>
        <h1>Profile</h1>
        <p>Email: {this.state.email}</p>{emailButton}
        <div className={displayProfileName}>
          <p>Name: {this.state.userName}</p>{nameButton}
        </div>
        <form className={profileClass} onSubmit={(event) => this.upDateUsername(event)}>
          <label>
            New Profile Name:
            <input name="newUserName" placeholder={this.state.userName} type="text" value={this.state.newUserName} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Save Name" />
          {closeButton}
        </form>
      </section>
    );
  }
}

export default UserProfile;
