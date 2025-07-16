import { allAuthors, type Author } from 'contentlayer/generated'
import { expectUnreachable } from './sweet'

function resolveAuthors(authors: string[]): Author[] {
  return authors.map((authorName) => {
    const author = allAuthors.find((author) => author.name === authorName)

    if (!author) {
      expectUnreachable(`Unknown author: '${authorName}'`)
    }

    return author
  })
}

export default resolveAuthors
