import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import Keywords from './Keywords';

const STORED_LIST_KEY = "keyword_list"

export default class Login extends Component {
   constructor(props) {
    super(props)
    this.state = {
      keywords : [],
      inputValue : "",
    };
  }

  createKeywordsList = (storedKeywords) => {
    let keywords = storedKeywords.map((item) => <Keywords keyword={item} parent={this}/>)
    this.setState({
      keywords: keywords
    })
  }

  componentDidMount() {
    // chrome.storage.sync.set({keywords: "neel"}, () => {}) 
    let storedKeywords = JSON.parse(window.localStorage.getItem(STORED_LIST_KEY))
    if (storedKeywords !== null && storedKeywords !== undefined) {
        this.createKeywordsList(storedKeywords)
    }  
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  addKeyword = () => {
   
    let storedKeywords = JSON.parse(window.localStorage.getItem(STORED_LIST_KEY))
    if (storedKeywords === null || storedKeywords === undefined) {
      storedKeywords = []
    }
    storedKeywords.push(this.state.inputValue)
    window.localStorage.setItem(STORED_LIST_KEY, JSON.stringify(storedKeywords))

    let keywords = this.state.keywords
    keywords.push(<Keywords keyword={this.state.inputValue}/>)
    this.setState({
      keywords: keywords
    })      
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
        </div>
      </div>
    );
  }

}