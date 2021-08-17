import {fetchData} from './utils/utils'


const STORED_KEYWORDS_KEY = "keyword_list"
const STORED_PAPERS_KEY = "papers_list"

const intervalFunc = () => {
	let storedKeywords = JSON.parse(window.localStorage.getItem(STORED_KEYWORDS_KEY))
    let storedPapers = JSON.parse(window.localStorage.getItem(STORED_PAPERS_KEY))
    if (storedKeywords !== null && storedKeywords !== undefined) {
      storedKeywords.forEach((item) => {
        fetchData(item, storedPapers[item])
      })
    }   
}

setInterval(() => {
	intervalFunc()
	// chrome.notifications.create(options, callback);
}, 3*60*60*1000)

intervalFunc()

console.log("background.js called")