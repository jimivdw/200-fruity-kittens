import React, { Component } from 'react';
import { getWalletsRef, addUserToWallet } from './firebase/db';

class JoinWallet extends Component {

  constructor(props) {
    super(props);
    this.state = {
      wallets: []
    };
  }

  componentDidMount() {
    this._onChildAdded = function(snapshot) {
      this.setState({ wallets: this.state.wallets.concat(Object.assign({ id: snapshot.key }, snapshot.val())) });
    }.bind(this);

    getWalletsRef().on('child_added', this._onChildAdded);
  }

  componentWillUnmount() {
    getWalletsRef().off('child_added', this._onChildAdded);
  }

  join(walletId) {
    const onWalletJoined = this.props.onWalletJoined || (() => { });
    const userId = window.localStorage.getItem('userId');
    addUserToWallet(walletId, userId).then(() => {
      onWalletJoined(walletId);
    });
  }

  render() {
    return (
      <div>
        {this.state.wallets.map(wallet => (
          <div className="wallet" key={wallet.id}>
            <div className="name">{wallet.name}</div>
            <div className="join"><button onClick={() => this.join(wallet.id)}>Join</button></div>
          </div>
        ))}
      </div>
    );
  }
}

export {
  JoinWallet
}
