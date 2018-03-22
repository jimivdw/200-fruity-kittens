import React, { Component } from 'react';
import { createWallet } from './firebase/db';

class NewWallet extends Component {

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
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Wallet name:
          <input name="name" type="text" value={this.state.name} onChange={this.handleInputChange} required />
        </label>

        <button type="submit">Create</button>
      </form>
    );
  }
}

export {
  NewWallet
}
