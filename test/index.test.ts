import { getChromeBookmark } from '../src/index'
import path from 'path'

const filePath = path.resolve(__dirname, 'resource/sample.json')

describe('getChromeBookmark', () => {
  it('returns expected array for sample.json', () => {
    const actual = getChromeBookmark(filePath)

    expect(actual).toHaveLength(20)
  })
})
