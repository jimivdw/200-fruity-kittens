import React, { Component } from 'react';
import Login from './googleLogin';
import logo from './img/logo_big.png';
import './App.css';
import { Menu } from './Menu';
import { NewWallet } from './NewWallet';

class App extends Component {
  state = {
    selectedMenu: 'New',
  };

  menuItems = ['New', 'Join', 'Wallets'];

  changeMenuItem = value => {
    this.setState({ selectedMenu: value });
  }

  isAuthenticated() {
    return true;
  }

  render() {
    if (!this.isAuthenticated()) {
      return <Login></Login>;
    }

    switch(this.state.selectedMenu) {
      case 'New': 
        this.menuActive = <NewWallet />
        break;
      case 'Join':
        this.menuActive = 'Join'
        break;
      case 'Wallets':
        this.menuActive = 'Wallets'
        break;
      default: 
        this.menuActive = <NewWallet />
        break;
    }

    return (
      <div className="App">
        <div className="content">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Obschak</h1>
          </header>
          {this.menuActive}
        </div>
        <Menu items={this.menuItems} handleChange={this.changeMenuItem} />
      </div>
    );
  }
}

export default App;
