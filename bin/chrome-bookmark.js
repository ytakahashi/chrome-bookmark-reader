#!/usr/bin/env node

const getChromeBookmark = require('../dist/index.js').getChromeBookmark
const bookmarks = getChromeBookmark(process.argv[2])
console.log(JSON.stringify(bookmarks))
