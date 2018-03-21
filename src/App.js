import React, { Component } from 'react';
import logo from './logo.svg';
import { app as firebaseApp } from './firebase/firebase';
import './App.css';
import { Menu } from './Menu';
import { NewWalletDialog } from './NewWallet';

class App extends Component {
  constructor(props) {
    super(props);
    this.features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof firebaseApp[feature] === 'function');
  };

  state = {
    newWalletOpen: false
  };

  changeNewWalletDialog = () => {
    this.setState({ newWalletOpen: !this.state.newWalletOpen })
  };

  menuItems = [{ name: 'New', dialog: this.changeNewWalletDialog}, { name: 'Join', dialog: () => {} }, { name: 'Wallets', dialog: () => {} }];

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Obschak</h1>
        </header>
        <NewWalletDialog 
          open={this.state.newWalletOpen}
          onClose={this.changeNewWalletDialog}
        />
        <Menu items={this.menuItems} />
      </div>
    );
  }
}

export default App;
