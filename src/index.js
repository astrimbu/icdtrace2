import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/app.css';
import logo from './logo.png';
import registerServiceWorker from './registerServiceWorker';


class App extends Component {

  render() {
    return (
      <div className="app">
        <div className="app-header-color"></div>
        <Header />
        <div className="app-main">
          <DiagnosisForm />
          <PrimaryResults />
        </div>
        <Footer />
      </div>
    );
  }

}


class Header extends Component {

  render() {
    return (
      <nav className="app-header">
        <div className="app-header-content">
          <div className="app-header-content-logo">
            <a href="www.vertical-data.com">
              <img src={logo} className="app-logo" alt="Seahorse Logo" />
            </a>
          </div>
          <div className="app-header-content-title">
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
      <footer className="app-footer">
        <div className="app-footer-content">
          Footer
        </div>
      </footer>
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
      <div className="app-diagnosis-form">
        <p>
          Enter Diagnosis:
        </p>
        <form className="app-form" onSubmit={this.handleSubmit}>
          <textarea className="app-diagnosis-textbox" value={this.state.value}
            onChange={this.handleChange} />
          <br /> 
          <input type="submit" className="app-form-submit" value="Get ICD Codes" />
        </form>
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
      </div>
    )
  }

}


ReactDOM.render(
  <App />, 
  document.getElementById('icdtrace')
);

registerServiceWorker();
