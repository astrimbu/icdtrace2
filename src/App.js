import React, { Component } from 'react';
import logo from './logo.png';
import './styles/app.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="Vertical Data Seahorse Logo" />
          <h2>ICDTrace</h2>
        </div>
        <p className="App-intro">
          Enter Diagnosis:
        </p>
        <form className="App-form">
          <textarea className="App-diagnosis" />
          <br /> 
          <input type="submit" className="App-submit" value="Get ICD
      Codes" />
        </form>
      </div>
    );
  }
}

export default App;
