import 'reflect-metadata'
import { ChromeBookmark, BookmarkElement } from './chromeBookmark'
import { plainToClass } from 'class-transformer'
import { readFileSync } from 'fs'

export const getChromeBookmark = function (
    filePath: string
): Array<BookmarkElement> {
    const obj = JSON.parse(readFileSync(filePath, 'utf8'))
    const bookmark = plainToClass(ChromeBookmark, obj)

    return bookmark.getValues()
}
