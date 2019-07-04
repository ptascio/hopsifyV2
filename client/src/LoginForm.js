import React from "react";
const axios = require("axios");

class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      notFound: "",
      currentUser: "",
      cookie: false
    };
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitCreateAccount = this.handleSubmitCreateAccount.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }
  handleSubmitLogin(e){
    e.preventDefault();
    axios({
      url: "/api/login",
      method: "post",
      data: this.state
    }).then((response) => {
      console.log(response);
      this.handleResponse(response);

    }).then(() => {
      this.props.setCookieUpdate(true);
    })
    .catch((err) => {
      this.setState({
        notFound: "We could not find that user. Please check email and password are correct or sign up for an account."
      });
    });
  }

  handleChange(e){
    var name = e.currentTarget.name;
    var value = e.currentTarget.value;
    this.setState({
      [name]: value
    });

  }

  handleSubmitCreateAccount(e){
    e.preventDefault();
    axios({
      url: "/api/create-account",
      method: "post",
      data: this.state
    }).then((response) => {
      console.log(response);
    });
  }

  handleResponse(res){
      var id = res.data._id;
      document.cookie = `Hopsify_userId=${id};max-age=600`;
      window.sessionStorage.hopsifyUserEmail = res.data.email;
      window.sessionStorage.hopsifyUserId = res.data._id;
      this.setState({
        currentUser: res.data.email,
        cookie: true
      });
  }

  componentWillUnmount(){

  }


  render(){
    return(
      <section>
        <p>{this.state.currentUser}</p>
        <p>{this.state.notFound}</p>
        <p>Fill out the form:</p>
        <form>
          <label>
            Email:
            <input onChange={this.handleChange} type="text" name="email"/>
          </label><br/>
          <label>
            Password:
            <input onChange={this.handleChange} type="password" name="password"/>
          </label><br/>
        </form>
        <p>Already have an account?</p>
        <button onClick={this.handleSubmitLogin}>Login</button>
        <p>Newbie?</p>
        <button onClick={this.handleSubmitCreateAccount}>Create Account</button>
      </section>
    );
  }
}

export default LoginForm;
