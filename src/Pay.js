import React, { Component } from 'react';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { spendMoney, getWalletRef } from './firebase/db';

export class Pay extends Component {
  constructor() {
    super();
    this.state = {
      amountRequested: null,
      paymentSending: false,
      wallet: null
    };

    this.pay = this.pay.bind(this);
  }

  componentDidMount() {
    this._handleWalletChange = function(snapshot) {
      const newWallet = snapshot.val();

      if (!this.state.wallet && newWallet) {
        setTimeout(() => {
          const amountRequested = Math.random() * newWallet.balance;
          this.setState({ amountRequested });
        }, Math.random() * 5000);
      }

      this.setState({ wallet: Object.assign({ id: snapshot.key }, newWallet)});
    }.bind(this);

    getWalletRef(this.props.walletId).on('value', this._handleWalletChange);
  }

  componentWillUnmount() {
    getWalletRef(this.props.walletId).off('value', this._handleWalletChange);
  }

  pay() {
    const onPaid = this.props.onPaid || (() => {});
    const { wallet, amountRequested } = this.state;

    this.setState({ paymentSending: true });
    setTimeout(() => {
      spendMoney(wallet.id, amountRequested).then(() => {
        this.setState({ amountRequested: null, paymentSending: false });
        onPaid(wallet.id);
      });
    }, 3000);
  }

  getContent() {
    if (this.state.amountRequested === null) {
      return <div>Please hold your phone to the terminal.</div>;
    }

    if (this.state.paymentSending) {
      return (
        <div>
          <p>Please hold while we're processing your payment...</p>
          <CircularProgress />
        </div>
      );
    }

    return (
      <div>
        <p>A payment of {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR' }).format(this.state.amountRequested)} is requested.</p>
        <Button variant="raised" onClick={this.pay}>Confirm payment</Button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2>Make a payment</h2>
        {this.getContent()}
      </div>
    );
  }
}
