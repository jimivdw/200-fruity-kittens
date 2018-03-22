import React, { Component } from 'react';
import { signOut } from './firebase/auth';

export class Logout extends Component {
  render() {
    return (
      <button onClick={signOut}>Logout</button>
    )
  }
}
