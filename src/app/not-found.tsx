import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'

export default function NotFound() {
  return (
    <SectionContainer>
      <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
        <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-6xl leading-9 font-extrabold tracking-tight text-gray-900 md:border-r-2 md:px-6 md:text-8xl md:leading-14 dark:text-gray-100">
            404
          </h1>
        </div>
        <div className="max-w-md">
          <p className="mb-4 text-xl leading-normal font-bold md:text-2xl">
            죄송해요, 요청하신 페이지를 찾을 수 없어요.
          </p>
          <p className="mb-8">하지만 괜찮아요! 홈페이지에서 다양한 콘텐츠를 만나보실 수 있어요.</p>
          <Link
            href="/"
            className="focus:shadow-outline-blue bg-brand-100 hover:bg-brand-105 inline rounded-lg border border-transparent px-4 py-2 text-sm leading-5 font-medium text-white shadow-xs transition-colors duration-150 focus:outline-hidden"
          >
            홈페이지로 돌아가기
          </Link>
        </div>
      </div>
    </SectionContainer>
  )
}
