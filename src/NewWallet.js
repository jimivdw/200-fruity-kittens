import React, { Component } from 'react';
import Dialog, { DialogTitle } from 'material-ui/Dialog';

class NewWalletDialog extends Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.handleClose} aria-labelledby="create-new-wallet">
        <DialogTitle id="simple-dialog-title">Create new Wallet</DialogTitle>
        <div>
          <input type="text" placeholder="Wallet Name"></input>
          <button type="submit">Create</button>
        </div>
      </Dialog>
    );
  }
}

export {
  NewWalletDialog
}
