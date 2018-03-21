import React, { Component } from 'react';
import injectSheet from 'react-jss'
import Login from './googleLogin';
import logo from './img/logo_big.png';
import { styles } from './App.styles';
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
    const { classes } = this.props;

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
      <div className={classes.wrapper}>
        <div className={classes.main}>
          <header className={classes.header}>
            <img src={logo} className={classes.logo} alt="logo" />
            <h1 className={classes.title}>Welcome to Obschak</h1>
          </header>
          {this.menuActive}
        </div>
        <Menu items={this.menuItems} handleChange={this.changeMenuItem} />
      </div>
    );
  }
}

export default injectSheet(styles)(App);
