import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DiagnosisForm from './DiagnosisForm';
import './styles/app.css';
import logo from './logo.png';
import registerServiceWorker from './registerServiceWorker';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="Seahorse Logo" />
          <h2>ICDTrace</h2>
        </div>
        <p className="App-intro">
          Enter Diagnosis:
        </p>
        <DiagnosisForm />
      </div>
    );
  }
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
);

registerServiceWorker();
