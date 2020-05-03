import { plainToClass, Type } from 'class-transformer'

export class BookmarkElement {
  name!: string
  type!: string
  url!: string

  constructor(name: string, url: string) {
    this.name = name
    this.url = url
  }

  @Type(() => BookmarkElement)
  children!: Array<BookmarkElement>

  getAsArray(): Array<BookmarkElement> {
    if (this.hasChildren()) {
      return this.children.flatMap(c => c.getAsArray())
    }

    return [this]
  }

  private hasChildren(): boolean {
    return this.children !== undefined
  }
}

export class BookmarkRoot extends Map<string, BookmarkElement> {
  getBookmarkElements(): Array<BookmarkElement> {
    return Array.from(this.values())
      .filter(value => value.children !== undefined)
      .map(e => plainToClass(BookmarkElement, e))
      .flatMap(e => e.getAsArray())
  }
}

export class ChromeBookmark {
  checksum!: string
  sync_metadata!: string
  version!: number

  @Type(() => BookmarkRoot)
  roots!: BookmarkRoot

  getValues(): Array<BookmarkElement> {
    return this.roots.getBookmarkElements()
  }
}
