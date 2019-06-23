import React from "react";
const axios = require("axios");

class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: "email",
      password: "",
      username: "frank",
      notFound: "",
      currentUser: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    axios({
      url: "/api/login",
      method: "post",
      data: this.state
    }).then((response) => {
      this.handleResponse(response);
    });
  }

  handleResponse(res){
    if(res.data.length === 0){
      this.setState({
        notFound: "We could not find that user. Please check email and password."
      });
    }else{
      var id = res.data[0]._id;
      document.cookie = `userId=${id};max-age=600`;
      this.setState({
        currentUser: res.data[0].username
      });


    }
  }

  render(){


    return(
      <section>
        <p>{this.state.currentUser}</p>
        <p>{this.state.notFound}</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input type="text" name="email"/>
          </label><br/>
          <label>
            Password:
            <input type="password" name="password"/>
          </label><br/>
          <input type="submit" value="Submit" />
        </form>
      </section>
    );
  }
}

export default LoginForm;
