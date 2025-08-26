import { allAuthors, type Author } from 'contentlayer/generated'
import { expectUnreachable } from './sweet'

function getAnonymousAuthor(): Author {
  return (
    allAuthors.find((a) => a.id === 'anonymous') ?? expectUnreachable('anonymous author not found')
  )
}

function resolveAuthors(authors: string[]): Author[] {
  if (authors.length === 0) {
    return [getAnonymousAuthor()]
  }

  return authors.map((authorId) => {
    const author = allAuthors.find((author) => author.id === authorId)

    if (author === undefined) {
      return getAnonymousAuthor()
    }

    return author
  })
}

export default resolveAuthors
