# chrome-bookmark-reader

![Typescript](https://img.shields.io/badge/-Typescript-007ACC.svg?logo=typescript&style=popout)
[![npm version](https://badge.fury.io/js/chrome-bookmark-reader.svg)](https://badge.fury.io/js/chrome-bookmark-reader)
[![Actions Status](https://github.com/ytakahashi/chrome-bookmark-reader/workflows/Node.js%20CI/badge.svg)](https://github.com/ytakahashi/chrome-bookmark-reader/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A library/cli to read Bookmarks of Google Chrome.  
This library parses bookmark json files of Google Chrome and returns the result as a flat json object.

## Requirements

- Node.js >= 12

## Usage

### As a library

```terminal
npm install chrome-bookmark-reader
```

```terminal
yarn add chrome-bookmark-reader
```

```typescript
import { getChromeBookmark } from 'chrome-bookmark-reader'

const path = '/path/to/Chrome/Bookmark'
const result = getChromeBookmark(path)

console.log(result)
// shows your bookmark contents
```

#### option

```typescript
const option = {
  shouldIncludeFolders: true,
}
const result = getChromeBookmark(path, option)
```

- `shouldIncludeFolders`: If `true`, results include bookmark folders (defaults to `false`).

### As a cli

```terminal
npm install -g chrome-bookmark-reader
```

```terminal
chrome-bookmark --file "/path/to/Chrome/Bookmark" [--pattern "something"] [--output "text"]
# -> shows your bookmark contents
```

#### options

- `--file` (`-f`): Required. Path to Chrome Bookmarks File (see below).
- `--pattern` (`-p`): Optional. If specified, result is filtered by the given value.
- `--output` (`-o`): Optional. Result is displayed according to this value. format. One of `"json"` or `"text"` is available. Defaults to `"json"`.

For detail, type `chrome-bookmark --help`.

#### Notice

If you are a mac user, you can find the bookmark json file at the following location:

- `"/Users/{Username}/Library/Application Support/Google/Chrome/{Chrome Profile}/Bookmarks"`
- [Where are Google Chrome bookmarks stored in macOS for multiple profiles?](https://apple.stackexchange.com/questions/322935/where-are-google-chrome-bookmarks-stored-in-macos-for-multiple-profiles)

For windows, see following article.

- [How to Find Chrome Bookmarks File Location in Windows](https://windowsloop.com/find-google-bookmarks-folder-windows/)

### Related repositories

- [chrome-history-reader](https://github.com/ytakahashi/chrome-history-reader)
