import { type ClassValue, clsx } from 'clsx'
import { type Config, extendTailwindMerge, mergeConfigs } from 'tailwind-merge'

function withFlightDesign(config: Config<'typo', ''>) {
  return mergeConfigs(config, {
    extend: {
      classGroups: {
        typo: [
          {
            typo: [
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'bold12',
              'bold11',
              'bold10',
              'body1',
              'body2',
              'body3',
              'body4',
              'body5',
              'body6',
              'caption2',
              'caption3',
              'caption4',
              'caption5',
              'caption6',
            ],
          },
        ],
      },
      conflictingClassGroups: {
        typo: ['font-size', 'font-weight', 'leading'],
      },
    },
  })
}

const twMerge = extendTailwindMerge(withFlightDesign)

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export default cn
