import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

function responseGoogle(response) {
  console.log(response);
}

class Login extends Component {
  render() {
    return (
      <GoogleLogin
        clientId="189087846366-19v4sg7cm4pu037b8opr2l2vk6u78n64.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}  
      >
      </GoogleLogin>
    )
  }
}

export default Login;
