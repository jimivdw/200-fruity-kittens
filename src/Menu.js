import React, { Component } from 'react';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';

class Menu extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    const listItems = this.props.items.map((item, index) => {
      return (
        <BottomNavigationAction key={item.name} label={item.name} onClick={item.dialog} />
      );
    });

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
      >
        {listItems}
      </BottomNavigation>
    );
  }
}

export {
  Menu
}