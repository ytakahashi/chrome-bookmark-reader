import Fuse from 'fuse.js'
import { BookmarkElement } from './chromeBookmark'
import { getChromeBookmark } from './index'
import {
  makeBooleanFlag,
  makeStringFlag,
  makeCommand,
  reduceFlag,
} from 'catacli'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const version = require('../package.json').version

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
    console.log(
      'Error: Option "--file" is required. See chrome-bookmark --help.'
    )
    process.exit(1)
  }

  return getChromeBookmark(filePath)
}

type OutputType = 'json' | 'text'
export const printBookmarks = (
  bookmarks: Bookmark[],
  output: OutputType
): void => {
  if (output === 'json') {
    console.log(JSON.stringify(bookmarks))
  } else {
    const str =
      bookmarks.length === 0
        ? ''
        : bookmarks
            .map(b => `${b.url}\t${b.name}`)
            .reduce((a, b) => `${a}\n${b}`)
    console.log(str)
  }
}

const filePathOption = makeStringFlag('file', {
  alias: 'f',
  usage: 'File path to Google Chrome Bookmark file.',
})

const filterOption = makeStringFlag('pattern', {
  alias: 'p',
  usage: 'If specified, outputs bookmarks which match to this pattern.',
})

const outputOption = makeStringFlag('output', {
  alias: 'o',
  usage:
    'Output format. One of "json" or "text" is available. Defaults to "json".',
})

const help = makeBooleanFlag('help', {
  alias: 'h',
  usage: 'show help message',
})

const flags = reduceFlag(help, filePathOption, filterOption, outputOption)

const validateOutputOption = (value?: string): OutputType => {
  const isValid = (value: string): value is OutputType =>
    value === 'json' || value === 'text'

  if (value === undefined) {
    return 'json'
  }

  if (isValid(value)) {
    return value
  }
  console.log(
    'Error: Invalid value for "--output". See chrome-bookmark --help.'
  )
  process.exit(1)
}

const command = makeCommand({
  name: 'chrome-bookmark',
  description: 'command line tool to read Google Chrome bookmarks',
  version: version,
  usage:
    'chrome-bookmark --file "/path/to/Chrome/Bookmark" [--pattern "something"] [--output "text"]',
  flag: flags,
  handler: (_, opts) => {
    const output = validateOutputOption(opts.output.value)
    const bookmarks = readBookmarks(opts.file.value).map(b => new Bookmark(b))
    const target = filterBookmarks(bookmarks, opts.pattern.value)
    printBookmarks(target, output)
  },
})

export const main = (): void => {
  command(process.argv.splice(2))
}
