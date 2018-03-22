import React, { Component } from 'react';
import injectSheet from 'react-jss'
import { GoogleLogin } from 'react-google-login';
import { signIn, signOut } from './firebase/auth';
import { styles } from './Login.styles';

export const Login = injectSheet(styles)(class Login extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.login}>
        <GoogleLogin
          clientId="189087846366-19v4sg7cm4pu037b8opr2l2vk6u78n64.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={signIn}
          onFailure={signOut}
        />
      </div>
    )
  }
});
