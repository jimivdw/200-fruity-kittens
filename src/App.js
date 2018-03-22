import React, { Component } from 'react';
import injectSheet from 'react-jss'
import { Login } from './Login';
import { Logout } from './Logout';
import logo from './img/logo_big.png';
import icon from './img/logo_small_inverted.png';
import { styles } from './App.styles';
import { Menu } from './Menu';
import { NewWallet } from './NewWallet';
import { JoinWallet } from './JoinWallet';
import { MyWallets } from './MyWallets';
import { Pay } from './Pay';
import { SceneRenderer } from './animation/SceneRenderer';
import CssBaseline from 'material-ui/CssBaseline';


class App extends Component {
  state = {
    selectedMenu: 'New',
    isAuthenticated: false,
    walletId: '-L8AJW3C1gGUOe2lxyYt'
  };

  menuItems = ['New', 'Join', 'Wallets', 'Render', 'Pay'];

  constructor() {
    super();

    window.addEventListener('user-change', ({ detail: { userId } }) => {
      window.localStorage.setItem('userId', userId);
      this.setState({ isAuthenticated: !!userId });
    });

    this.onWalletCreated = this.onWalletCreated.bind(this);
    this.onWalletJoined = this.onWalletJoined.bind(this);
    this.onPaid = this.onPaid.bind(this);
  }

  changeMenuItem = value => {
    this.setState({ selectedMenu: value });
  }

  onWalletCreated(walletId) {
    console.log('Wallet created', walletId);
    this.setState({ selectedMenu: 'Wallet' });
  }

  onWalletJoined(walletId) {
    console.log('Wallet joined', walletId);
    this.setState({ selectedMenu: 'Wallet' });
  }

  onPaid(walletId) {
    console.log('Wallet paid', walletId);
    this.setState({ selectedMenu: 'Wallet' });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.app}>
        <CssBaseline/>
        <div className={classes.main}>
          {this.state.isAuthenticated
            ? (
              <div className={classes.loginContainer}>
                <header className={classes.header}>
                  <img src={icon} className={classes.icon} alt="logo" />
                  <h1 className={classes.title}>Obschak</h1>
                  <Logout />
                </header>
                <div className={classes.content}>
                  {this.getActiveMenu()}
                </div>
                <Menu items={this.menuItems} handleChange={this.changeMenuItem} />
              </div>
            )
            : (
              <div className={classes.loginContainer}>
                <header className={classes.loginHeader}>
                  <img src={logo} className={classes.logo} alt="logo" />
                  <h1 className={classes.title}>Welcome to Obschak</h1>
                </header>
                <Login />
              </div>
            )}
        </div>
      </div>
    );
  }

  getActiveMenu() {
    switch (this.state.selectedMenu) {
      case 'New':
        return <NewWallet onWalletCreated={this.onWalletCreated} />;
      case 'Join':
        return <JoinWallet onWalletJoined={this.onWalletJoined} />;
      case 'Wallets':
        return <MyWallets/>;
      case 'Render':
        return <SceneRenderer />;
      case 'Pay':
        return <Pay onPaid={this.onPaid} walletId={this.state.walletId} />;
      default:
        return 'Hello';
    }
  }
}

export default injectSheet(styles)(App);
