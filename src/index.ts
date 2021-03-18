import 'reflect-metadata'
import { BookmarkElement, ChromeBookmark } from './chromeBookmark'
import { plainToClass } from 'class-transformer'
import { readFileSync } from 'fs'

export {
  BookmarkElement,
  BookmarkFolderElement,
  BookmarkUrlElement,
} from './chromeBookmark'

// optional parameter to read bookmark file
export type BookmarkOption = {
  // if true, results include folders (defaults to false)
  shouldIncludeFolders: boolean
}

const defaultOption = {
  shouldIncludeFolders: false,
}

export const getChromeBookmark = function (
  filePath: string,
  option?: BookmarkOption
): Array<BookmarkElement> {
  const obj = JSON.parse(readFileSync(filePath, 'utf8'))
  const bookmark = plainToClass(ChromeBookmark, obj)

  return bookmark.getValues(option !== undefined ? option : defaultOption)
}
