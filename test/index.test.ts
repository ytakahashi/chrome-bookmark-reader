import {
  getChromeBookmark,
  BookmarkFolderElement,
  BookmarkUrlElement,
} from '../src/index'
import path from 'path'

const filePath = path.resolve(__dirname, 'resource/sample.json')

describe('getChromeBookmark', () => {
  it('returns expected array for sample.json', () => {
    const actual = getChromeBookmark(filePath)

    expect(actual).toHaveLength(20)
  })

  it('returns expected array including folders for sample.json', () => {
    const actual = getChromeBookmark(filePath, {
      shouldIncludeFolders: true,
    })
    expect(actual).toHaveLength(35)

    const urls = actual
      .filter(b => b.isUrlElement())
      .map(b => b as BookmarkUrlElement)
    expect(urls).toHaveLength(20)

    const folders = actual
      .filter(b => b.isFolderElement())
      .map(b => b as BookmarkFolderElement)
    expect(folders).toHaveLength(15)
  })
})
