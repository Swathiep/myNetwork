import React, { Component } from 'react';
import './App.css';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {userName: '', password: ''};
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleUserNameChange(event) {
    this.setState({userName: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  onSubmit(event) {
    console.log("On Submit:: username entered:: "+this.state.userName+" password:: "+this.state.password);
    fetch('/signin', { 
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName: this.state.userName,
          password: this.state.password
        })
      })
      .then(res => {
        console.log(res);
        if(res.status === 200)
          return res.json();
        else 
          return null;
      })
      .then(res => {
        console.log(res);
        //access particular field in json response
        if(res !== null) {
          console.log('user email:: '+res.email);
          alert('Signed In Successfully');
        } else {
          alert('User not found');
        }   
        this.setState({userName: '', password: ''});     
      });
    event.preventDefault();
  }

  render() {
    const { userName, password } = this.state;
    const isEnabled =
          userName.length > 0 &&
          password.length > 0;
    return (      
      <form className="signinForm">
        <h4>SignIn into MyNetwork</h4>
        <div className="signinDiv">
          <p>User Name</p>
          <input className="signinInput" type="text" value={this.state.userName} onChange={this.handleUserNameChange} />
        </div>
        <div className="signinDiv">
          <p>Password</p>
          <input className="signinInput" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
        </div>
        <button className="signInButton" onClick={this.onSubmit} disabled={!isEnabled}>SUBMIT</button>
        <p className="newUserLabel">New User?<span className="signUpContainer"><a href="/signup">SignUp</a></span></p>
      </form>
    );
  }
}

export default Signin;
