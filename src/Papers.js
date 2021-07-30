import React, { Component } from 'react';
import './App.css';


export default function Papers(props) {

	const openPaperLink = (link) => {
		 chrome.tabs.create({ url: link });
	}

	return (
		<div className="paperContainer" onClick = {() => openPaperLink(props.link)}>
			{props.title}
		</div>
	)
}