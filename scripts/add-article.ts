import fs from 'fs'
import path from 'path'
import prompts, { type PromptObject } from 'prompts'
import kleur from 'kleur'
import { allAuthors } from '.contentlayer/generated/index.mjs'
import siteMetadata from '@/data/siteMetadata'
import slugify from '@/utils/slugify'
import formatFrontmatter from '@/utils/formatFrontmatter'

const questions: PromptObject[] = [
  {
    type: 'text',
    name: 'title',
    message: '아티클 제목을 입력하세요',
    validate: (value) => (value === '' ? '제목은 필수입니다.' : true),
  },
  {
    type: 'text',
    name: 'slug',
    message: '슬러그(slug)를 입력하세요. (파일명 및 URL에 사용됨)',
    validate: (value) => {
      if (value === '') {
        return 'slug는 필수입니다.'
      }

      const slug = slugify(value)
      if (fs.existsSync(path.join('data', 'articles', `${slug}.mdx`))) {
        return `이미 존재하는 slug입니다: ${slug}`
      }

      return true
    },
    initial: (_, values) => slugify(values.title),
    format: slugify,
  },
  {
    type: 'multiselect',
    name: 'authors',
    message: '작성자를 선택하세요',
    choices: allAuthors.map(({ name, id }) => ({
      title: `${name} (${id})`,
      value: id,
    })),
    hint: '- 스페이스바로 선택, 엔터로 완료',
    instructions: false,
    min: 1,
  },
  {
    type: 'text',
    name: 'summary',
    message: '아티클 요약을 입력하세요 (선택 사항, 리스트 화면에 노출됩니다)',
  },
  {
    type: 'toggle',
    name: 'draft',
    message: '임시저장 글로 설정하시겠습니까?',
    initial: false,
    active: '예',
    inactive: '아니요',
  },
  {
    type: 'date',
    name: 'date',
    message: '발행일을 선택하세요',
    initial: new Date(),
    mask: 'YYYY-MM-DD',
  },
  {
    type: 'select',
    name: 'layout',
    message: '레이아웃을 선택하세요',
    choices: [
      {
        title: 'PostLayout',
        value: 'PostLayout',
        description: '아티클과 함께 저자 정보가 표시됩니다.',
      },
      {
        title: 'PostSimple',
        value: 'PostSimple',
        description: '아티클에 집중할 수 있는 심플한 레이아웃입니다.',
      },
      {
        title: 'PostBanner',
        value: 'PostBanner',
        description: '썸네일이 아티클 상단 배너로 표시됩니다.',
      },
    ],
    hint: '- 엔터로 완료',
  },
  {
    type: 'list',
    name: 'tags',
    message: '태그를 입력하세요 (선택 사항, 여러 개는 쉼표로 구분)',
  },
  {
    type: 'list',
    name: 'images',
    message: '썸네일 이미지 Cloudinary ID를 입력하세요 (선택 사항, 여러 개는 쉼표로 구분)',
  },
  {
    type: 'date',
    name: 'lastmod',
    message: '최종 수정일을 선택하세요',
    mask: 'YYYY-MM-DD',
  },
  {
    type: 'text',
    name: 'canonicalUrl',
    message: '아티클의 대표 URL을 입력하세요 (선택 사항, SEO용 Canonical URL)',
    initial: (_, values) => `${siteMetadata.siteUrl}/articles/${values.slug}`,
  },
]

function writeArticleFile(answers: prompts.Answers<string>) {
  const { slug } = answers
  const fileName = `${slug}.mdx`
  const filePath = path.join('data', 'articles', fileName)
  const frontmatter = formatFrontmatter(answers)

  const content = `${frontmatter}
여기 아티클 본문을 작성하세요!
`
  fs.writeFileSync(filePath, content)

  return filePath
}

function printSuccessMessage(filePath: string) {
  const borderText = '░░'.repeat(25)

  console.log(`
    ${kleur.dim().cyan(borderText)}
                                     
    ${kleur.bold('아티클 생성이 완료되었습니다! 🎉')}

    경로: ${kleur.underline().cyan(filePath)}

    이제 해당 파일을 열어 아티클 본문을 작성해보세요!
  
    ${kleur.dim().cyan(borderText)}
  `)
}

async function main() {
  const answers = await prompts(questions, {
    onCancel: () => process.exit(0),
  })

  const filePath = writeArticleFile(answers)
  printSuccessMessage(filePath)
}

main()
