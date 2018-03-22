import React, { Component } from 'react';
import injectSheet from 'react-jss';
import Button from 'material-ui/Button';
import { getWalletRef } from './firebase/db';
import { styles } from './ActiveWallet.styles';

class _ActiveWallet extends Component {
  constructor() {
    super();
    this.state = {
      wallet: null
    };

    this.pay = this.pay.bind(this);
  }

  componentDidMount() {
    this._handleWalletChange = function(snapshot) {
      this.setState({ wallet: Object.assign({ id: snapshot.key }, snapshot.val()) });
    }.bind(this);

    getWalletRef(this.props.walletId).on('value', this._handleWalletChange);
  }

  componentWillUnmount() {
    getWalletRef(this.props.walletId).off('value', this._handleWalletChange);
  }

  pay() {
    const doPay = this.props.doPay || (() => {});
    doPay(this.props.walletId);
  }

  render() {
    const { classes } = this.props;
    if(!this.state.wallet) {
      return null;
    }

    return (
      <div className={classes.container}>
        <div className={classes.info}>
          <span>{this.state.wallet.name}:</span>&nbsp;
          <span className={classes.balance}>{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR' }).format(this.state.wallet.balance)}</span>
        </div>
        <Button variant="raised" onClick={this.pay}>Pay</Button>
      </div>
    );
  }
}

export const ActiveWallet = injectSheet(styles)(_ActiveWallet);
