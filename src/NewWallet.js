import React, { Component } from 'react';
import injectSheet from 'react-jss'
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { createWallet } from './firebase/db';
import { styles } from './Form.styles'

class _NewWallet extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(evt) {
    const onWalletCreated = this.props.onWalletCreated || (() => {});
    const userId = window.localStorage.getItem('userId');
    createWallet(this.state.name, userId).then(onWalletCreated);
    evt.preventDefault();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <h2>Create a new wallet</h2>
        <form onSubmit={this.handleSubmit}>
          <TextField className={classes.wide} name="name" label="Wallet name" type="text" value={this.state.name} onChange={this.handleInputChange} required />

          <hr className={classes.divider}/>

          <div className={classes.actions}>
            <Button className={classes.wide} type="submit" variant="raised">Create</Button>
          </div>
        </form>
      </div>
    );
  }
}

export const NewWallet = injectSheet(styles)(_NewWallet);
