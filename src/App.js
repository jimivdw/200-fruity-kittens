import React, { Component } from 'react';
import Login from './googleLogin';
import logo from './img/logo_big.png';
import './App.css';
import { Menu } from './Menu';
import { NewWallet } from './NewWallet';

class App extends Component {
  state = {
    selectedMenu: 'New',
    isAuthenticated: false
  };

  menuItems = ['New', 'Join', 'Wallets'];

  constructor() {
    super();
    
    window.addEventListener('user-change', ({ detail: { userId }}) => {
      this.setState({ isAuthenticated: !!userId });
    });
  }

  changeMenuItem = value => {
    this.setState({ selectedMenu: value });
  }

  render() {
    if (!this.state.isAuthenticated) {
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
            <Login />
          </header>
          {this.menuActive}
        </div>
        <Menu items={this.menuItems} handleChange={this.changeMenuItem} />
      </div>
    );
  }
}

export default App;
