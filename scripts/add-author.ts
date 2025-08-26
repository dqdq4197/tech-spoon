import fs from 'fs'
import path from 'path'
import prompts, { type PromptObject } from 'prompts'
import kleur from 'kleur'
import formatFrontmatter from '@/utils/formatFrontmatter'

const questions: PromptObject[] = [
  {
    type: 'text',
    name: 'name',
    message: '작성자 이름을 입력하세요',
    validate: (value) => {
      if (value === '') {
        return '이름은 필수입니다.'
      }

      return true
    },
  },
  {
    type: 'text',
    name: 'id',
    message: '작성자 ID를 입력하세요 (예: author_12)',
    validate: (value) => {
      if (value === '') {
        return 'ID는 필수입니다.'
      }

      if (fs.existsSync(path.join('data', 'authors', `${value}.mdx`))) {
        return '이미 존재하는 ID입니다.'
      }

      const validIdRegex = /^[a-zA-Z0-9_-]+$/
      if (!validIdRegex.test(value)) {
        return 'ID는 영문, 숫자, 하이픈(-), 언더스코어(_)만 사용할 수 있습니다.'
      }

      return true
    },
  },
  {
    type: 'text',
    name: 'avatar',
    initial: 'anonymous_avatar',
    message: '아바타 이미지 ID를 입력하세요 (선택 사항, Cloudinary 이미지 ID)',
  },
  {
    type: 'text',
    name: 'occupation',
    message: '직업을 입력하세요 (선택 사항)',
  },
  {
    type: 'text',
    name: 'company',
    message: '회사명을 입력하세요 (선택 사항)',
  },
  {
    type: 'text',
    name: 'email',
    message: '이메일 주소를 입력하세요 (선택 사항)',
  },
  {
    type: 'text',
    name: 'githubId',
    message: 'GitHub ID를 입력하세요 (선택 사항)',
  },
]

function writeAuthorFile(answers: prompts.Answers<string>) {
  const { id, githubId, ...metaData } = answers

  const frontmatter = formatFrontmatter({
    ...metaData,
    id,
    github: githubId ? `https://github.com/${githubId}` : undefined,
  })
  const content = `${frontmatter}
간단한 소개를 Markdown 형식으로 작성해 보세요!
`

  const filePath = path.join('data', 'authors', `${id}.mdx`)
  fs.writeFileSync(filePath, content)

  return filePath
}

function printSuccessMessage(answers: prompts.Answers<string>, filePath: string) {
  const { name } = answers

  const prefix = '새로운 저자'
  const suffix = '님이 등록되었어요! 🎉'
  const successTitle = `${prefix} ${kleur.green(name)}${suffix}`
  const borderText = '░░'.repeat(successTitle.length)

  console.log(`
    ${kleur.dim().cyan(borderText)}

    ${kleur.bold(successTitle)}

    경로: ${kleur.underline().cyan(filePath)}

    ${kleur.dim().cyan(borderText)}
  `)
}

async function main() {
  const answers = await prompts(questions, {
    onCancel: () => process.exit(0),
  })

  const filePath = writeAuthorFile(answers)
  printSuccessMessage(answers, filePath)
}

main()
