import { allAuthors, type Author } from 'contentlayer/generated'
import { expectUnreachable } from './sweet'

function getAnonymousAuthor(): Author {
  return (
    allAuthors.find((a) => a.name === 'anonymous') ??
    expectUnreachable('anonymous author not found')
  )
}

function resolveAuthors(authors: string[]): Author[] {
  if (authors.length === 0) {
    return [getAnonymousAuthor()]
  }

  return authors.map((authorName) => {
    const author = allAuthors.find((author) => author.name === authorName)

    if (author === undefined) {
      return getAnonymousAuthor()
    }

    return author
  })
}

export default resolveAuthors
