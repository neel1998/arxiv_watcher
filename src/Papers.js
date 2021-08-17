import React, { useState } from 'react';
import './ArxivWatcher.css';


export default function Papers(props) {
	const [isNew, setNew] = useState(props.new);
	const openPaperLink = (link) => {
		chrome.tabs.create({ url: link });
	}
	return (
		<div className={isNew ? "newPaperContainer" : "paperContainer"} onClick = {() => openPaperLink(props.link)}>
			{props.title}
		</div>
	)
}