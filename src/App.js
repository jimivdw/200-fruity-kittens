import React, { Component } from 'react';
import logo from './logo.svg';
import { app as firebaseApp } from './firebase/firebase';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof firebaseApp[feature] === 'function');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          Firebase is loaded and has {this.features.length} features available.
        </p>
      </div>
    );
  }
}

export default App;
