# Arxiv Watcher

<p align="center">
  <img height="300" src="docs/logo.png">
</p>

## Do you find it tedious to constantly check arxiv for newly added papers for the research topic you are working on?

Not anymore!!!

**Arxiv Watcher** is a chrome extension which allows you to add the specific keyword you wish to track and notifies you whenever a new paper is added to the arxiv relevant to the keywords you have added.



https://user-images.githubusercontent.com/32041242/129781083-df1516fa-3914-4597-ad3a-a7ddbf12a442.mp4

Not only does this extension shows the latest papers added, but it checks arxiv in background at specific intervals and notifies the users whenever a new paper is added. Like this,


<p align="center">
    <img src = "docs/notification.png"/>
</p>

# Add to chrome

The extension is published on the chrome web store and can be added to your browser from [here](https://chrome.google.com/webstore/detail/arxiv-watcher/dmiglaegdelenllhmnhkobceicoppjfd)

# Development

To locally build and test this extension, clone this repo and then run the following commands:

```
npm install
npm run build
```

This will generate a `./dist` folder in the root directory of the repository. Now, 
1. open Google Chrome
2. go to **Settings -> More Tools -> Extension**
3. Enable **Developer Mode**
4. Click on **Load unpacked**
5. Select the `./dist` folder you just created. 
