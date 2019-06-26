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
      currentUser: ""
    };
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitCreateAccount = this.handleSubmitCreateAccount.bind(this);
  }
  handleSubmitLogin(e){
    e.preventDefault();
    axios({
      url: "/api/login",
      method: "post",
      data: this.state
    }).then((response) => {
      console.log("in here");
      this.handleResponse(response);
    }).catch((err) => {
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
      console.log("here");
      console.log(res);
      var id = res.data._id;
      document.cookie = `userId=${id};max-age=600`;
      this.setState({
        currentUser: res.data.email
      });

  }

  componentDidMount(){
    if(document.cookie){
      console.log(this.props.history.goBack());
    }
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
