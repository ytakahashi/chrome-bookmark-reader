import {
  filterBookmarks,
  printBookmarks,
  readBookmarks,
  Bookmark,
} from '../src/cli'
import { BookmarkElement } from '../src/chromeBookmark'
import * as index from '../src/index'

const element1 = new BookmarkElement('Test 1', 'https://example.com')
const element2 = new BookmarkElement('Test 2', 'https://foo.com')
const element3 = new BookmarkElement('Hello', 'https://bar.com')

let consoleLogSpy: jest.SpyInstance
let processExitSpy: jest.SpyInstance
let getChromeBookmarkSpy: jest.SpyInstance
beforeEach(async () => {
  consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()
  processExitSpy = jest.spyOn(process, 'exit').mockImplementation()
  getChromeBookmarkSpy = jest
    .spyOn(index, 'getChromeBookmark')
    .mockImplementation()
})

afterEach(() => {
  consoleLogSpy.mockRestore()
  processExitSpy.mockRestore()
  getChromeBookmarkSpy.mockRestore()
})

describe('filterBookmark', () => {
  it('returns expected array for pattern: undefined', () => {
    // Given
    const bookmarks = [element1, element2, element3]
    const pattern = undefined

    // When
    const actual = filterBookmarks(bookmarks, pattern)

    // Then
    expect(actual).toHaveLength(3)
  })

  it('returns expected array for pattern: "foo"', () => {
    // Given
    const bookmarks = [element1, element2, element3]
    const pattern = 'foo'

    // When
    const actual = filterBookmarks(bookmarks, pattern)

    // Then
    expect(actual).toHaveLength(1)
    expect(actual).toContain(element2)
  })

  it('returns expected array for pattern: "hello"', () => {
    // Given
    const bookmarks = [element1, element2, element3]
    const pattern = 'hello'

    // When
    const actual = filterBookmarks(bookmarks, pattern)

    // Then
    expect(actual).toHaveLength(1)
    expect(actual).toContain(element3)
  })
})

describe('readBookmark', () => {
  it('exits if given path is undefined', () => {
    // Given
    const path = undefined

    // When
    readBookmarks(path)

    // Then
    expect(console.log).toBeCalled()
    expect(process.exit).toBeCalled()

    consoleLogSpy.mockClear()
    processExitSpy.mockClear()
    getChromeBookmarkSpy.mockClear()
  })

  it('works correctly', () => {
    // Given
    const path = '/path/to/Bookmark'

    // When
    readBookmarks(path)

    // Then
    expect(console.log).not.toBeCalled()
    expect(process.exit).not.toBeCalled()
    expect(index.getChromeBookmark).toBeCalled()

    consoleLogSpy.mockClear()
    processExitSpy.mockClear()
    getChromeBookmarkSpy.mockClear()
  })
})

describe('printBookmarks', () => {
  it('prints empty array in json', () => {
    // Given
    const bookmarks: Bookmark[] = []

    // When
    printBookmarks(bookmarks, 'json')

    // Then
    expect(console.log).toBeCalled()
    expect(consoleLogSpy.mock.calls[0][0]).toBe('[]')

    consoleLogSpy.mockClear()
    consoleLogSpy.mockRestore()
  })

  it('prints empty array in text', () => {
    // Given
    const bookmarks: Bookmark[] = []

    // When
    printBookmarks(bookmarks, 'text')

    // Then
    expect(console.log).toBeCalled()
    expect(consoleLogSpy.mock.calls[0][0]).toBe('')

    consoleLogSpy.mockClear()
    consoleLogSpy.mockRestore()
  })

  it('prints one bookmark in text', () => {
    // Given
    const bookmark1 = new Bookmark(element1)
    const bookmarks: Bookmark[] = [bookmark1]

    // When
    printBookmarks(bookmarks, 'text')

    // Then
    expect(console.log).toBeCalledTimes(1)
    expect(consoleLogSpy.mock.calls[0][0]).toBe('https://example.com\tTest 1')

    consoleLogSpy.mockClear()
    consoleLogSpy.mockRestore()
  })

  it('prints bookmarks in json', () => {
    // Given
    const bookmark1 = new Bookmark(element1)
    const bookmark2 = new Bookmark(element2)
    const bookmarks: Bookmark[] = [bookmark1, bookmark2]

    // When
    printBookmarks(bookmarks, 'json')

    // Then
    expect(console.log).toBeCalled()
    expect(consoleLogSpy.mock.calls[0][0]).toBe(
      '[{"name":"Test 1","url":"https://example.com"},{"name":"Test 2","url":"https://foo.com"}]'
    )

    consoleLogSpy.mockClear()
    consoleLogSpy.mockRestore()
  })

  it('prints bookmarks in text', () => {
    // Given
    const bookmark1 = new Bookmark(element1)
    const bookmark2 = new Bookmark(element2)
    const bookmarks: Bookmark[] = [bookmark1, bookmark2]

    // When
    printBookmarks(bookmarks, 'text')

    // Then
    expect(console.log).toBeCalledTimes(1)
    expect(consoleLogSpy.mock.calls[0][0]).toBe(
      'https://example.com\tTest 1\nhttps://foo.com\tTest 2'
    )

    consoleLogSpy.mockClear()
    consoleLogSpy.mockRestore()
  })
})
