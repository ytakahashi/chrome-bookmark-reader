# chrome-bookmark-reader

A library/cli to read Bookmarks of Google Chrome.  
This library parses bookmark json files of Google Chrome and returns the result as a flat json object.

## usage

### As a library

```terminal
npm install chrome-bookmark-reader

// or

yarn add chrome-bookmark-reader
```

```javascript
const chromeBookmarkReader = require('chrome-bookmark-reader')

const path = "/path/to/Chrome/Bookmark"
const result = chromeBookmarkReader.getChromeBookmark(path);

console.log(result)
// shows your bookmark contents
```

### As a cli

```terminal
npm install -g chrome-bookmark-reader
```

```terminal
% chrome-bookmark "/path/to/Chrome/Bookmark"
// shows your bookmark contents
```

Note:  

If you are a mac user, you can find the bookmark json file at the following location:

- `"/Users/{Username}/Library/Application Support/Google/Chrome/{Chrome Profile}/Bookmarks"`
