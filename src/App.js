import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import Keywords from './Keywords';
import Papers from './Papers';

const STORED_KEYWORDS_KEY = "keyword_list"
const STORED_PAPERS_KEY = "papers_list"

export default class Login extends Component {
   constructor(props) {
    super(props)
    this.state = {
      keywords : [],
      inputValue : "",
      papers : []
    };
  }

  createKeywordsList = (storedKeywords) => {
    let keywords = storedKeywords.map((item) => <Keywords keyword={item} parent={this}/>)
    this.setState({
      keywords: keywords
    })
    this.fetchData(storedKeywords)
  }

  createQuery = (keywords) => {
    //https://export.arxiv.org/api/query?search_query=ti:%22image%20segmentation%22+OR+ti:%22zero%20shot%20learning%22&sortBy=submittedDate&sortOrder=descending&max_results=20
    let queryString = "https://export.arxiv.org/api/query?search_query="
    let len = keywords.length
    for (let i = 0; i < len - 1; i++) {
      queryString += "all:\"" + keywords[i] + "\"+OR+"
    }
    queryString += "all:\"" + keywords[len - 1] + "\"&sortBy=submittedDate&sortOrder=descending&max_results=10"
    return queryString 
  }

  storePapersData = (papers) => {
    window.localStorage.setItem(STORED_PAPERS_KEY, JSON.stringify(papers))
    let papersElement = papers.map((item) => <Papers title={item.title} link={item.link}/>)
    this.setState({
      papers: papersElement
    })
  }

  fetchData = (storedKeywords) => {
    let queryString = this.createQuery(storedKeywords)
    console.log(queryString)
    fetch(queryString)
      .then((res) => {
        res.text().then((text) => {
            let parser = new window.DOMParser()
            let parsed = parser.parseFromString(text, 'text/xml')
            let entries = parsed.getElementsByTagName("entry")
            let papers = []
            for (let i = 0; i < entries.length; i++) {
              papers.push({
                title : entries[i].getElementsByTagName("title")[0].innerHTML,
                link: entries[i].getElementsByTagName("id")[0].innerHTML
              })
            }
            this.storePapersData(papers)
        }).catch((err) => {
          console.log(err)
        })
      })
      .catch((err) => {
        console.log(err)
    })
  }

  componentDidMount() {
    // chrome.storage.sync.set({keywords: "neel"}, () => {}) 
    let storedKeywords = JSON.parse(window.localStorage.getItem(STORED_KEYWORDS_KEY))
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
    let storedKeywords = JSON.parse(window.localStorage.getItem(STORED_KEYWORDS_KEY))
    if (storedKeywords === null || storedKeywords === undefined) {
      storedKeywords = []
    }
    storedKeywords.push(this.state.inputValue)
    window.localStorage.setItem(STORED_KEYWORDS_KEY, JSON.stringify(storedKeywords))

    this.createKeywordsList(storedKeywords)    
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