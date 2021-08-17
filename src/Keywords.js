import React, { Component } from 'react';
import './ArxivWatcher.css';
const STORED_KEYWORDS_KEY = "keyword_list"
const STORED_PAPERS_KEY = "papers_list"


export default function Keywords(props) {

	const removeItem = () => {
		let storedKeywords = JSON.parse(window.localStorage.getItem(STORED_KEYWORDS_KEY))
		storedKeywords.splice(storedKeywords.indexOf(props.keyword),1)
		window.localStorage.setItem(STORED_KEYWORDS_KEY, JSON.stringify(storedKeywords))

		let storedPapersData = JSON.parse(window.localStorage.getItem(STORED_PAPERS_KEY))
		delete storedPapersData[props.keyword]
		window.localStorage.setItem(STORED_PAPERS_KEY, JSON.stringify(storedPapersData))

		props.parent.fetchAndDisplayStoredData()
	}

	return (
		<div className="keywordContainer">
		<span>{props.keyword}</span>
		<div className="keywordRemoveButton" onClick={removeItem}><span>x</span></div>
		</div>
	)
}