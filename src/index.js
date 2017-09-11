import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Table from 'grommet/components/Table'
import TableHeader from 'grommet/components/TableHeader'
import TableRow from 'grommet/components/TableRow'
import Button from 'grommet/components/Button'
import Form from 'grommet/components/Form'
import TextInput from 'grommet/components/TextInput'

import '../node_modules/grommet-css'
import './styles/app.css'
import logo from './logo.png'
import registerServiceWorker from './registerServiceWorker'
import $ from 'jquery'
window.jQuery = window.$ = $


class App extends Component {

  render() {
    return (
      <div className="app">
        <div className="header-color" />
        <Header />
        <ICDTrace />
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
            <a href="https://www.vertical-data.com">
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
        </div>
      </footer>
    )
  }
}


class ICDTrace extends Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      diagnosis: '', 
      results: {"in_text": "", "result": [[]]},
			rotate: 0
    }
  }

  handleChange(event) {
    this.setState({diagnosis: event.target.value})
  }

  handleSubmit(event) {
		var jsonResults = [
      {"in_text": "pain in left foot", "result": [[0.3077935056255462, 421690, "S99", "Other and unspecified injuries of ankle and foot"], [0.2581988897471611, 382763, "R52", "Pain, unspecified"], [0.2535462764185549, 432978, "T69", "Other effects of reduced temperature"], [0.23717082451262844, 381920, "Q70", "Syndactyly"], [0.23354968324845682, 421461, "S97", "Crushing injury of ankle and foot"], [0.2070196678027063, 421528, "S98", "Traumatic amputation of ankle and foot"], [0.2070196678027063, 364355, "H57", "Other disorders of eye and adnexa"], [0.2032789070454353, 374432, "M79", "Other and unspecified soft tissue disorders, not elsewhere classified"], [0.1999999999999999, 421195, "S96", "Injury of muscle and tendon at ankle and foot level"], [0.19781414201873607, 425052, "T25", "Burn and corrosion of ankle and foot"]]},
      {"in_text": "right hand", "result": [[0.32732683535398854, 432978, "T69", "Other effects of reduced temperature"], [0.3110855084191276, 371192, "M18", "Osteoarthritis of first carpometacarpal joint"], [0.30618621784789724, 381920, "Q70", "Syndactyly"], [0.280056016805602, 408056, "S69", "Other and unspecified injuries of wrist, hand and finger(s)"], [0.25264557631995577, 371209, "M19", "Other and unspecified osteoarthritis"], [0.24743582965269673, 407673, "S67", "Crushing injury of wrist, hand and fingers"], [0.23570226039551595, 369905, "M07", "Enteropathic arthropathies"], [0.23145502494313774, 407781, "S68", "Traumatic amputation of wrist, hand and fingers"], [0.22176638128637177, 374494, "M80", "Osteoporosis with current pathological fracture"], [0.22176638128637177, 373522, "M63", "Disorders of muscle in diseases classified elsewhere"]]},
			{"in_text": "inner ear", "result": [[0.2886751345948128, 356534, "C30", "Malignant neoplasm of nasal cavity and middle ear"], [0.26726124191242434, 421804, "T16", "Foreign body in ear"], [0.23570226039551584, 381450, "Q17", "Other congenital malformations of ear"], [0.22941573387056172, 365083, "H82", "Vertiginous syndromes in diseases classified elsewhere"], [0.22941573387056172, 364735, "H67", "Otitis media in diseases classified elsewhere"], [0.19611613513818402, 364778, "H69", "Other and unspecified disorders of Eustachian tube"], [0.19611613513818402, 365166, "H92", "Otalgia and effusion of ear"], [0.18898223650461357, 365243, "H94", "Other disorders of ear in diseases classified elsewhere"], [0.18898223650461357, 364874, "H72", "Perforation of tympanic membrane"], [0.18898223650461357, 364622, "H62", "Disorders of external ear in diseases classified elsewhere"]]}
		]

    var diagnosis = encodeURIComponent(this.state.diagnosis.trim())
    var session_url = 'https://acre.cdm.depaul.edu/default/api/v1/instant/ml/50/8?text=' + diagnosis 

    var xhr = new XMLHttpRequest()
    xhr.onerror = () => {
      this.setState({results: jsonResults[this.state.rotate]})
      if (this.state.rotate < 2) {
        this.setState({rotate: this.state.rotate += 1})
      } else {
        this.setState({rotate: 0})
      }
    }
    xhr.open("POST", session_url, true)
    var data = window.btoa(unescape(encodeURIComponent('username:password')))
    xhr.setRequestHeader("Authorization", "Basic " + data)
    xhr.send()

    event.preventDefault()
  }

	handleClick(event) {
    event.currentTarget.style.backgroundColor = '#ccc'
  }

  render() {
    return (
      <div className="container">
        <div className="icdtrace">
          <div className="diagnosis-form">
            <Form onSubmit={this.handleSubmit}>
              <h2>
                Enter Diagnosis:
              </h2>
              <TextInput className="diagnosis-text" placeHolder="Diagnosis" onDOMChange={this.handleChange} />
							<br />
              <Button type="submit" primary='true' label="Get ICD Codes" />
            </Form>
          </div>
          <div className="results">
            <Table>
              <TableHeader labels={['ID', 'Code', 'Description']} />
              <tbody>
                {this.state.results.result.map(result => {
                  return (
                    <TableRow onClick={this.handleClick}>
                      <td>{result[1]}</td>
                      <td>{result[2]}</td>
                      <td>{result[3]}</td>
                    </TableRow>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    )
  }

}


ReactDOM.render(
  <App />, 
  document.getElementById('icdtrace')
);

registerServiceWorker();
