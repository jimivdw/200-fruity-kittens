import React, { Component } from 'react';
import injectSheet from 'react-jss'
import Button from 'material-ui/Button';
import { getWalletsRef, getCreatedWalletsForUser, getJoinedWalletsForUser, removeWallet } from './firebase/db'
import { styles } from './Form.styles'

const userId = window.localStorage.getItem('userId')

class _MyWallets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myWallets: [],
      joinedWallets: [],
    };
  }

  setMyWallets(userId) {
    getCreatedWalletsForUser(userId).then((walletArray) => {
      this.setState({ myWallets: walletArray })
    });
  }

  setJoinedWallets(userId) {
    getJoinedWalletsForUser(userId).then((walletArray) => {
      this.setState({ joinedWallets: walletArray })
    })
  }

  componentDidMount() {
    this._onChildRemoved = function(snapshot) {
      this.setState({ myWallets: this.state.myWallets.filter(wallet => wallet.id !== snapshot.key) });
    }.bind(this);
    this.setJoinedWallets(userId);
    this.setMyWallets(userId);

    getWalletsRef().on('child_removed', this._onChildRemoved);
  }


  render() {
    const { classes } = this.props;
    return (
      <div>
        <h2>My wallets</h2>
        <h3 className="walletType">Owned</h3>
        {
          this.state.myWallets.map(wallet => (
            <div className={classes.option} key={wallet.id}>
              <span className={classes.optionName}>{wallet.name}</span>
              <span><Button variant="raised" onClick={() => removeWallet(wallet.id)}>Cancel</Button></span>
            </div>
          ))
        }
        <h3 className="walletType">Joined</h3>
        {
          this.state.joinedWallets.map(wallet => (
            <div className={classes.option} key={wallet.id}>
              <div className={classes.optionName}>{wallet.name}</div>
            </div>
          ))
        }
      </div>
    )
  }
}
export const MyWallets = injectSheet(styles)(_MyWallets);
