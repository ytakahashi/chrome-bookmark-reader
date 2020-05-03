import Fuse from 'fuse.js'
import { BookmarkElement } from './chromeBookmark'
import { getChromeBookmark } from './index'
import { makeStringFlag, makeCommand, reduceFlag } from 'catacli'
import { description, version } from '../package.json'

export class Bookmark {
  name: string
  url: string

  constructor(element: BookmarkElement) {
    this.name = element.name
    this.url = element.url
  }
}

export const filterBookmarks = (
  bookmarks: Bookmark[],
  pattern?: string
): Bookmark[] => {
  if (pattern !== undefined) {
    const fuse = new Fuse(bookmarks, { keys: ['name', 'url'] })
    return fuse.search(pattern).map(r => r.item)
  } else {
    return bookmarks
  }
}

export const readBookmarks = (filePath?: string): BookmarkElement[] => {
  if (filePath === undefined) {
    console.log('Error: Option "--file" is required.')
    process.exit(1)
  }

  return getChromeBookmark(filePath)
}

export const printBookmarks = (bookmarks: Bookmark[]): void => {
  console.log(JSON.stringify(bookmarks))
}

const filePathOption = makeStringFlag('file', {
  usage: 'bookmark file path',
})

const filterOption = makeStringFlag('pattern', {
  usage: 'outputs bookmarks which match to this pattern',
})

const flags = reduceFlag(filePathOption, filterOption)

const command = makeCommand({
  name: 'chrome-bookmark',
  description: description,
  version: version,
  usage:
    'chrome-bookmark --file "/path/to/Chrome/Bookmark" [--pattern "something"]',
  flag: flags,
  handler: (args, opts) => {
    const bookmarks = readBookmarks(opts.file.value).map(b => new Bookmark(b))
    const target = filterBookmarks(bookmarks, opts.pattern.value)
    printBookmarks(target)
  },
})

export const main = (): void => {
  command(process.argv.splice(2))
}
