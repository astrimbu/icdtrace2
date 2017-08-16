import React, { Component } from 'react';

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
    alert('A diagnosis was submitted: ' + this.state.value)
    event.preventDefault()
  }

  render() {
    return (
      <form className="App-form" onSubmit={this.handleSubmit}>
        <textarea className="App-diagnosis" value={this.state.value}
					onChange={this.handleChange} />
        <br /> 
        <input type="submit" className="App-submit" value="Get ICD Codes" />
      </form>
    )
  }

}

export default DiagnosisForm;
