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
        <Main />
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


class Main extends Component {

  render() {
    return (
      <div className="main">
        <DiagnosisForm />
        <Results />
      </div>
    )
  }
}


class DiagnosisForm extends Component {

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
    event.preventDefault()
    var ml_model_id = 50
    var tv_task_id  = 8
    var diagnosis = this.state.value
    diagnosis = encodeURIComponent(diagnosis.trim())
    var session_url = 'https://acre.cdm.depaul.edu/default/api/v1/' +
        'instant/ml/' + ml_model_id + '/' + tv_task_id + '?text=' + diagnosis
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
        {result: 1, code: 123, description: 'ur dead'},
        {result: 2, code: 234, description: 'ur alive'}
      ]
    }
  }

  render() {
    return (
      <div className="results">
        <PrimaryResults />
        <SecondaryResults />
      </div>
    )
  }
}


class PrimaryResults extends Component {

  constructor(props) {
    super(props)
    this.state = {
      results: []
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
  }

  render() {
    return (
      <div className="primary-results">
        <table className="primary-results-table">
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
                  <td>#</td>
                  <td>{result.code}</td>
                  <td>{result.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        Primary results!
      </div>
    )
  }

}


class SecondaryResults extends Component {

  render() {
    return (
      <div className="secondary-results">
        Secondary results!
      </div>
    )
  }
}


ReactDOM.render(
  <App />, 
  document.getElementById('icdtrace')
);

registerServiceWorker();
