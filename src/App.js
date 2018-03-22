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
import { ActiveWallet } from './ActiveWallet';
import { Pay } from './Pay';
import { SceneRenderer } from './animation/SceneRenderer';
import CssBaseline from 'material-ui/CssBaseline';


class App extends Component {
  state = {
    selectedMenu: 'Wallets',
    isAuthenticated: false,
    activeWallet: null
  };

  menuItems = ['Wallets', 'New', 'Join'];

  constructor() {
    super();

    window.addEventListener('user-change', ({ detail: { userId } }) => {
      window.localStorage.setItem('userId', userId);
      this.setState({ isAuthenticated: !!userId });
    });

    this.onWalletCreated = this.onWalletCreated.bind(this);
    this.onWalletJoined = this.onWalletJoined.bind(this);
    this.doPay = this.doPay.bind(this);
    this.onPaid = this.onPaid.bind(this);
    this.showWallet = this.showWallet.bind(this);
  }

  changeMenuItem = value => {
    this.setState({ selectedMenu: value });
  }

  onWalletCreated(walletId) {
    this.setState({ activeWallet: walletId, selectedMenu: 'Render' });
  }

  onWalletJoined(walletId) {
    this.setState({ activeWallet: walletId, selectedMenu: 'Render' });
  }
  
  showWallet(walletId) {
    this.setState({ activeWallet: walletId, selectedMenu: 'Render' });
  }

  doPay(walletId) {
    this.setState({ selectedMenu: 'Pay' });
  }

  onPaid(walletId) {
    this.setState({ activeWallet: walletId, selectedMenu: 'Render' });
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
                  <div className={classes.headerMain}>
                    <img src={icon} className={classes.icon} alt="logo" />
                    <h1 className={classes.title}>Obschak</h1>
                    <Logout />
                  </div>
                  {this.state.activeWallet ? <div className={classes.headerDetails}><ActiveWallet walletId={this.state.activeWallet} doPay={this.doPay}/></div> : ''}
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
    if(this.state.activeWallet && !['Render', 'Pay'].includes(this.state.selectedMenu)) {
      this.setState({ activeWallet: null });
      return;
    }

    switch (this.state.selectedMenu) {
      case 'New':
        return <NewWallet onWalletCreated={this.onWalletCreated} />;
      case 'Join':
        return <JoinWallet onWalletJoined={this.onWalletJoined} />;
      case 'Wallets':
        return <MyWallets showWallet={this.showWallet}/>;
      case 'Render':
        return <SceneRenderer walletId={this.state.activeWallet} />;
      case 'Pay':
        return <Pay onPaid={this.onPaid} walletId={this.state.activeWallet} />;
      default:
        return 'Hello';
    }
  }
}

export default injectSheet(styles)(App);
