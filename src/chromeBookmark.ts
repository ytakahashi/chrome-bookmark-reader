import { plainToClass, Type } from 'class-transformer'
import { BookmarkOption } from './index'

export class BookmarkElement {
  name!: string
  type!: string
  url?: string

  @Type(() => BookmarkElement)
  children?: Array<BookmarkElement>

  getAsArray(option?: BookmarkOption): Array<BookmarkElement> {
    if (this.children !== undefined) {
      return option?.shouldIncludeFolders
        ? [...this.children.flatMap(c => c.getAsArray(option)), this]
        : this.children.flatMap(c => c.getAsArray(option))
    }

    return [this]
  }

  public isUrlElement = (): this is BookmarkUrlElement => {
    return this.url !== undefined
  }

  public isFolderElement = (): this is BookmarkFolderElement => {
    return this.url === undefined
  }

  public toType = (): BookmarkFolderElement | BookmarkUrlElement => {
    return this.isFolderElement()
      ? (this as BookmarkFolderElement)
      : (this as BookmarkUrlElement)
  }
}

export type BookmarkFolderElement = {
  name: string
  children?: Array<BookmarkElement>
}

export type BookmarkUrlElement = {
  name: string
  url: string
}

export class BookmarkRoot extends Map<string, BookmarkElement> {
  getBookmarkElements(option: BookmarkOption): Array<BookmarkElement> {
    return Array.from(this.values())
      .filter(value => value.children !== undefined)
      .map(e => plainToClass(BookmarkElement, e))
      .flatMap(e => e.getAsArray(option))
  }
}

export class ChromeBookmark {
  checksum!: string
  sync_metadata!: string
  version!: number

  @Type(() => BookmarkRoot)
  roots!: BookmarkRoot

  getValues(option: BookmarkOption): Array<BookmarkElement> {
    return this.roots.getBookmarkElements(option)
  }
}
