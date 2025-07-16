import type { ReadTimeResults } from 'reading-time'

function formatReadingTime(readingTime: ReadTimeResults): string {
  const { minutes } = readingTime

  if (minutes < 1) {
    return '1분 미만'
  }

  return `${Math.ceil(minutes)}분`
}

export default formatReadingTime
