import logo from './logo.svg';
import './ArxivWatcher.css';
import React, { Component } from 'react';
import Keywords from './Keywords';
import Papers from './Papers';
import {fetchData} from './utils/utils'

const STORED_KEYWORDS_KEY = "keyword_list"
const STORED_PAPERS_KEY = "papers_list"

export default class ArxivWatcher extends Component {
   constructor(props) {
    super(props)
    this.state = {
      keywords : [],
      inputValue : "",
      papers : []
    };
  }

  fetchAndDisplayStoredData = () => {
    console.log("display data called")
    let storedData = JSON.parse(window.localStorage.getItem(STORED_PAPERS_KEY))
    if (storedData !== null && storedData !== undefined) {
      let papersElement = []
      let keywordsElement = []
      for (let k of Object.keys(storedData)) {
        papersElement.push(<h4>{k}</h4>)
        let paperData = storedData[k].map((item) => <Papers title={item.title} link={item.link} new={false}/>)
        papersElement.push(paperData)  
        keywordsElement.push(<Keywords keyword={k} parent={this}/>)
      }
      this.setState({
        papers: papersElement,
        keywords: keywordsElement
      })
    }
  }

  componentDidMount() {
    console.log("componentDidMount called")
    this.fetchAndDisplayStoredData()
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  addKeyword = async () => {
    let newKeyword = this.state.inputValue
    newKeyword = newKeyword.toLowerCase().trim()
    let storedKeywords = JSON.parse(window.localStorage.getItem(STORED_KEYWORDS_KEY))
    if (storedKeywords === null || storedKeywords === undefined) {
      storedKeywords = []
    }
    console.log(storedKeywords)
    if (! storedKeywords.includes(newKeyword)) {
      storedKeywords.push(newKeyword)
      window.localStorage.setItem(STORED_KEYWORDS_KEY, JSON.stringify(storedKeywords))

      let keywords = this.state.keywords
      keywords.push(<Keywords keyword={newKeyword} parent={this}/>)
      this.setState({
        keywords: keywords
      })
      fetchData(newKeyword, []).then(() => {
        this.fetchAndDisplayStoredData()
      }).catch((err) => {
        console.log(err)
      })
    }
  }


  render() {
    return (
      <div className="App">
        <div className = "mainContainer">
          <span>Add keywords you wish to track</span>
          <div className="inputContainer">
            <input type = "text" placeholder="Add keyword" name = "inputValue" value={this.state.inputValue} onChange={this.handleChange}/>
            <div className = "addButton" onClick = {this.addKeyword}>Add</div>
          </div>

          <div className = "keywordsContainer">{this.state.keywords}</div>

          <hr/>
          <div className = "papersContainer">{this.state.papers}</div>
        </div>
      </div>
    );
  }

}