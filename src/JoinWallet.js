import React, { Component } from 'react';
import injectSheet from 'react-jss'
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { getWalletsRef, addUserToWallet } from './firebase/db';
import { styles } from './Form.styles'

class _JoinWallet extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      wallets: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    this._onChildAdded = function(snapshot) {
      this.setState({ wallets: this.state.wallets.concat(Object.assign({ id: snapshot.key }, snapshot.val())) });
    }.bind(this);
    this._onChildChanged = function(snapshot) {
      this.setState({ wallets: this.state.wallets.map(wallet => wallet.id === snapshot.key ? Object.assign(wallet, snapshot.val()) : wallet) });
    }.bind(this);
    this._onChildRemoved = function(snapshot) {
      this.setState({ wallets: this.state.wallets.filter(wallet => wallet.id !== snapshot.key) });
    }.bind(this);

    getWalletsRef().on('child_added', this._onChildAdded);
    getWalletsRef().on('child_changed', this._onChildChanged);
    getWalletsRef().on('child_removed', this._onChildRemoved);
  }

  componentWillUnmount() {
    getWalletsRef().off('child_added', this._onChildAdded);
    getWalletsRef().off('child_changed', this._onChildChanged);
    getWalletsRef().off('child_removed', this._onChildRemoved);
  }

  getJoinableWallets() {
    const userId = window.localStorage.getItem('userId');
    return this.state.wallets.filter(wallet =>
      new RegExp(this.state.search, 'i').test(wallet.name) &&
      !Object.keys(wallet.users || []).includes(userId));
  }

  join(walletId) {
    const onWalletJoined = this.props.onWalletJoined || (() => { });
    const userId = window.localStorage.getItem('userId');
    addUserToWallet(walletId, userId).then(() => {
      onWalletJoined(walletId);
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <h2>Join a wallet</h2>

        <TextField className={classes.wide} label="Search" type="text" name="search" value={this.state.search} onChange={this.handleInputChange} />

        <div>
          {this.getJoinableWallets().map(wallet => (
            <div className={classes.option} key={wallet.id}>
              <div className={classes.optionName}>{wallet.name}</div>
              <div className={classes.optionAction}>
                <Button variant="raised" onClick={() => this.join(wallet.id)}>Join</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export const JoinWallet = injectSheet(styles)(_JoinWallet);

