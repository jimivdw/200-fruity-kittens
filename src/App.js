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
    const { classes } = this.props;

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
<<<<<<< HEAD
      <div className="App">
        <div className="content">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Obschak</h1>
            <Login />
=======
      <div className={classes.wrapper}>
        <div className={classes.main}>
          <header className={classes.header}>
            <img src={logo} className={classes.logo} alt="logo" />
            <h1 className={classes.title}>Welcome to Obschak</h1>
>>>>>>> 1587467fd37a4cd6bfa3cc48d51151dfd9c3bdef
          </header>
          {this.menuActive}
        </div>
        <Menu items={this.menuItems} handleChange={this.changeMenuItem} />
      </div>
    );
  }
}

export default injectSheet(styles)(App);
