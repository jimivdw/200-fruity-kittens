import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { signIn, signOut } from './firebase/auth'

class Login extends Component {
  render() {
    return (
      <div>
      <GoogleLogin
        clientId="189087846366-19v4sg7cm4pu037b8opr2l2vk6u78n64.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={signIn}
        onFailure={signOut}  
      >
      </GoogleLogin>  
      <button onClick={signOut}>Logout</button>
      </div>
    )
  }
}

export default Login;
