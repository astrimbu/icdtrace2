import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/app.css';
import logo from './logo.png';
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';
window.jQuery = window.$ = $;


class App extends Component {

  render() {
    return (
      <div className="app">
        <div className="header-color" />
        <Header />
        <Parent />
        <Footer />
      </div>
    );
  }

}


class Header extends Component {

  render() {
    return (
      <nav className="header">
        <div className="header-content">
          <div className="header-content-logo">
            <a href="www.vertical-data.com">
              <img src={logo} className="logo" alt="Seahorse Logo" />
            </a>
          </div>
          <div className="header-content-title">
            <h1>ICDTrace</h1>
          </div>
        </div>
      </nav>
    )
  }
}


class Footer extends Component {
  
  render() {
    return (
      <footer className="footer">
        <div className="footer-content">
          Footer
        </div>
      </footer>
    )
  }
}


class Parent extends Component {

  constructor(props) {
    super(props)
    this.state = {diagnosis: ''}

    var session_url = 'https://acre.cdm.depaul.edu/default/api/v1/' +
        'instant/ml/50/8?text=' + this.state.diagnosis 
  }
  
  render() {
    return (
      <div className="parent">
        <Diagnosis />
        <Results />
      </div>
    )
  }
}

class Diagnosis extends Component {

  constructor(props) {
    super(props)
    this.state = {value: ''}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    var diagnosis = encodeURIComponent(this.state.value.trim())
    alert(diagnosis)

    event.preventDefault()
  }

  render() {
    return (
      <div className="diagnosis-form">
        <p>
          Enter Diagnosis:
        </p>
        <form className="form" onSubmit={this.handleSubmit}>
          <textarea className="diagnosis-textbox" value={this.state.value}
            onChange={this.handleChange} />
          <br /> 
          <input type="submit" className="form-submit" value="Get ICD Codes" />
        </form>
      </div>
    )
  }

}


class Results extends Component {

  constructor(props) {
    super(props)
    this.state = {
      results: [
        {code: "R44", description: "Other symptoms and signs involving general sensations and perceptions"},
        {code: "R63", description: "Symptoms and signs concerning food and fluid intake"},
        {code: "R09", description: "Other symptoms and signs involving the circulatory and respiratory system"},
      ]
    }
  }

  render() {
    return (
      <div className="results">
        <table className="results-table">
          <thead>
            <tr>
              <th>Result</th>
              <th>Code</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {this.state.results.map(function(result) {
              return (
                <tr>
                  <td></td>
                  <td>{result.code}</td>
                  <td>{result.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  }
}


ReactDOM.render(
  <App />, 
  document.getElementById('icdtrace')
);

registerServiceWorker();
