import React, { Component } from 'react';
import Button from 'material-ui/Button';
import { signOut } from './firebase/auth';

export class Logout extends Component {
  render() {
    return (
      <Button variant="raised" onClick={signOut}>Logout</Button>
    )
  }
}
