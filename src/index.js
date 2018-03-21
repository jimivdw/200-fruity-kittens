import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const responseGoogle = (response) => {
  console.log(response);
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
