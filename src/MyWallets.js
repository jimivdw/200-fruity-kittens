import React, { Component } from 'react';
import { getCreatedWalletsForUser, getJoinedWalletsForUser } from './firebase/db'

const userId = window.localStorage.getItem('userId')

class MyWallets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myWallets: [],
      joinedWallets: [],
    };
  }

  getWallets(userId) {

  }

  setMyWallets(userId) {
    getCreatedWalletsForUser(userId).then((walletArray) => {
      this.setState({ myWallets: walletArray })
    });
  }

  setJoinedWallets(userId) {
    getJoinedWalletsForUser(userId).then((walletArray) => {
      console.log('joinedwallets', walletArray.toString());
      this.setState({ joinedWallets: walletArray })
    })
  }

  componentDidMount() {
    this.setJoinedWallets(userId);
    this.setMyWallets(userId);
  }

  render() {
    return (
      <div>
        <h3 className="walletType">Owned
        </h3>
        {
          this.state.myWallets.map(wallet => (
            <div className="wallet" key={wallet.id}>
              <div className="name">{wallet.name}</div>
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