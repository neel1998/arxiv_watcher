const STORED_KEYWORDS_KEY = "keyword_list"
const STORED_PAPERS_KEY = "papers_list"


var options = {
  type: "basic",
  title: "Notification from Arxiv Watcher",
  message: "New papers added to arxiv for the keywords you are watching",
  iconUrl: "arxiv_watcher_logo_512.png"
};
function callback(){
    console.log('Popup done!')
}

createQuery = (keyword) => {
    let queryString = "https://export.arxiv.org/api/query?search_query=all:\""+keyword+"\"&sortBy=submittedDate&sortOrder=descending&max_results=5"
    return queryString 
}

storePapersData = (keyword, papers) => {
  let storedPapersData = JSON.parse(window.localStorage.getItem(STORED_PAPERS_KEY))
  if (storedPapersData === null || storedPapersData === undefined) {
    storedPapersData = {}
  }
  storedPapersData[keyword] = papers
  window.localStorage.setItem(STORED_PAPERS_KEY, JSON.stringify(storedPapersData)) 
    
} 

fetchData = (keyword, storedPapers) => {
  console.log("fetch data called")
  // chrome.notifications.create(options, callback);
  return new Promise((resolve, reject) => {
    let queryString = createQuery(keyword)
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
            if (storedPapers.length > 0) {
              let idx = papers.findIndex((item) => {return item.link === storedPapers[0].link})
              console.log("idx:", idx)
              if (idx !== 0) {
                chrome.notifications.create(options, callback);
              }
              storePapersData(keyword, papers)
              resolve()
            } else {
              storePapersData(keyword, papers)
              resolve()
            }
        }).catch((err) => {
          console.log(err)
          reject(err)
        })
      })
      .catch((err) => {
        console.log(err)
        reject(err)
    })  
  })
  
}

module.exports = {
  fetchData: fetchData
}