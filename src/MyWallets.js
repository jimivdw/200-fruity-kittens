import React, { Component } from 'react';
import { getWalletsRef, getCreatedWalletsForUser, getJoinedWalletsForUser, removeWallet } from './firebase/db'

const userId = window.localStorage.getItem('userId')

class MyWallets extends Component {
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
    return (
      <div>
        <h3 className="walletType">Owned
        </h3>
        {
          this.state.myWallets.map(wallet => (
            <div className="wallet" key={wallet.id}>
              <span className="name">{wallet.name}</span>
              <span><button onClick={() => removeWallet(wallet.id)}>Cancel</button></span>
            </div>
          ))
        }
        <h3 className="walletType">Joined
        </h3>
        {
          this.state.joinedWallets.map(wallet => (
            <div className="wallet" key={wallet.id}>
              <div className="name">{wallet.name}</div>
            </div>
          ))
        }
      </div>
    )
  }
}

export {
  MyWallets
}