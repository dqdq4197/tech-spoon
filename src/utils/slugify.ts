type Options = {
  /** 소문자화 (기본: true) */
  lowercase?: boolean
  /** 최대 길이 (기본: 제한 없음) */
  maxLength?: number
  /** 구분자 (기본: "-") */
  separator?: string
}

function slugify(input: string, options?: Options): string {
  const { lowercase = true, maxLength, separator = '-' } = options || {}

  if (!input) {
    return ''
  }

  // 유니코드 정규화(NFKD) + 결합 분음 부호 제거(주로 라틴 악센트)
  let slug = input.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')

  // 공백/구분 기호를 통일된 구분자로 변환 (여러 종류의 대시/공백/점 등)
  const sepClass = `\\p{Zs}\\u2000-\\u200B\\u202F\\u205F\\-_.·—–‒―` // 공백/대시/점/중점
  slug = slug.replace(new RegExp(`[${sepClass}]+`, 'gu'), separator)

  // 유니코드 문자/숫자/결합기호(한글 포함) + 구분자만
  slug = slug.replace(
    new RegExp(`[^\\p{Letter}\\p{Number}\\p{Mark}${escapeForCharClass(separator)}]`, 'gu'),
    ''
  )

  // 구분자 중복 축소
  const sepRe = new RegExp(`${escapeForRegExp(separator)}{2,}`, 'g')
  slug = slug.replace(sepRe, separator)

  // 앞/뒤 구분자 제거
  const edgeSepRe = new RegExp(`^${escapeForRegExp(separator)}|${escapeForRegExp(separator)}$`, 'g')
  slug = slug.replace(edgeSepRe, '')

  if (lowercase) {
    slug = slug.toLowerCase()
  }

  if (typeof maxLength === 'number' && maxLength > 0) {
    slug = slug.slice(0, maxLength)
  }

  return slug.replace(edgeSepRe, '')
}

function escapeForRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function escapeForCharClass(s: string): string {
  return s.replace(/[[\]\\^-]/g, '\\$&')
}

export default slugify
