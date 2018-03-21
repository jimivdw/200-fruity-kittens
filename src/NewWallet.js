import React, { Component } from 'react';
import { createWallet } from './firebase/db';

class NewWallet extends Component {
  render() {
    return (
      <div>
        <input type="text" placeholder="Wallet Name"></input>
        <button type="submit">Create</button>
      </div>
    );
  }
}

export {
  NewWallet
}
