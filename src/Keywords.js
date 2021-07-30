import React, { Component } from 'react';
import './App.css';
const STORED_LIST_KEY = "keyword_list"


export default function Keywords(props) {

	const removeItem = () => {
		let storedKeywords = JSON.parse(window.localStorage.getItem(STORED_LIST_KEY))
		storedKeywords.splice(storedKeywords.indexOf(props.keyword),1)
		window.localStorage.setItem(STORED_LIST_KEY, JSON.stringify(storedKeywords))
      	props.parent.createKeywordsList(storedKeywords)
	}

	return (
		<div className="keywordContainer">
		<span>{props.keyword}</span>
		<div className="keywordRemoveButton" onClick={removeItem}><span>x</span></div>
		</div>
	)
}