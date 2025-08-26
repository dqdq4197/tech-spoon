import { isDate } from 'util/types'

function formatValue(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map((v) => `'${v}'`).join(', ')}]`
  }

  if (isDate(value)) {
    return `'${value.toISOString().split('T')[0]}'`
  }

  if (typeof value === 'boolean' || typeof value === 'number') {
    return String(value)
  }

  if (typeof value === 'string') {
    const trimmed = value.trim()

    return `'${trimmed}'`
  }

  return String(value)
}

function formatFrontmatter(metaData: { [id in string]: unknown }): string {
  const lines = Object.entries(metaData)
    .filter(([, value]) => {
      if (Array.isArray(value)) {
        return value.some((v) => v !== '')
      }

      if (typeof value === 'string') {
        return value.trim() !== ''
      }

      return value !== undefined
    })
    .map(([key, value]) => `${key}: ${formatValue(value)}`)

  return `---\n${lines.join('\n')}\n---\n`
}

export default formatFrontmatter
