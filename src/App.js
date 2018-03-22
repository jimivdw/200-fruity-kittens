import React, { Component } from 'react';
import injectSheet from 'react-jss'
import { Login } from './Login';
import { Logout } from './Logout';
import logo from './img/logo_big.png';
import { styles } from './App.styles';
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

    window.addEventListener('user-change', ({ detail: { userId } }) => {
      window.localStorage.setItem('userId', userId);
      this.setState({ isAuthenticated: !!userId });
    });

    this.onWalletCreated = this.onWalletCreated.bind(this);
  }

  changeMenuItem = value => {
    this.setState({ selectedMenu: value });
  }

  onWalletCreated(walletId) {
    console.log('Wallet created', walletId);
    this.setState({ selectedMenu: 'Wallet' });
  }

  render() {
    const { classes } = this.props;

    if (!this.state.isAuthenticated) {
      return <Login />;
    }

    return (
      <div className={classes.app}>
        <div className={classes.main}>
          <header className={classes.header}>
            <img src={logo} className={classes.logo} alt="logo" />
            <h1 className={classes.title}>Welcome to Obschak</h1>
            <Logout />
          </header>
          {this.getActiveMenu()}
        </div>
        <Menu items={this.menuItems} handleChange={this.changeMenuItem} />
      </div>
    );
  }

  getActiveMenu() {
    switch (this.state.selectedMenu) {
      case 'New':
        return <NewWallet onWalletCreated={this.onWalletCreated}/>;
      case 'Join':
        return 'Join';
      case 'Wallets':
        return 'Wallets';
      case 'Wallet':
        return 'Wallet x';
      default:
        return 'Hello';
    }
  }
}

export default injectSheet(styles)(App);
