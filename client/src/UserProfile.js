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
      newEmail: "",
      setUserName: "",
      changeName: false,
      changeEmail: false,
      revealForm: false,
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
      [`${t}`]: !this.state[`${t}`],
      revealForm: !this.state.revealForm,
      newUserName: "",
      newEmail: ""
    });
  }
  handleChange(e){
    console.log(this.state.newUserName);
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
    var labelValue = this.state.changeName ? "New Profile Name:" : "New Profile Email";
    var inputName = this.state.changeName ? "newUserName" : "newEmail";
    var inputPlaceholder = this.state.changeName ? this.state.userName : this.state.email;
    var inputValue = this.state.changeName ? this.state.newUserName : this.state.newEmail;
    var submitValue = this.state.changeName ? "Save Name" : "Save Email";
    var profileClass = this.state.revealForm ? "ChangeName" : "HideChangeName";
    var displayProfileClass = this.state.revealForm ? "HideProfileName" : "ShowProfileName";
    return(
      <section>
        <h1>Profile</h1>
        <div className={displayProfileClass}>
          <p>Email: {this.state.email}</p>{emailButton}
        </div>
        <div className={displayProfileClass}>
          <p>Name: {this.state.userName}</p>{nameButton}
        </div>
        <form className={profileClass} onSubmit={(event) => this.upDateUsername(event)}>
          <label>
            {labelValue}
            <input name={inputName} placeholder={inputPlaceholder} type="text" value={inputValue} onChange={this.handleChange}/>
          </label>
          <input type="submit" value={submitValue} />
          {closeButton}
        </form>
      </section>
    );
  }
}

export default UserProfile;
