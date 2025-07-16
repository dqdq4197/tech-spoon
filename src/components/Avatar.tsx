import { cn, expectUnreachable } from '@/utils'
import type { Author } from 'contentlayer/generated'
import { cva, type VariantProps } from 'class-variance-authority'
import { CldImage } from 'next-cloudinary'

const sizeMap = {
  small: 24,
  medium: 32,
  large: 40,
}

const overlapVariants = cva('', {
  variants: {
    size: {
      small: '-ml-2',
      medium: '-ml-3',
      large: '-ml-4',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

interface Props extends VariantProps<typeof overlapVariants> {
  avatars: Author['avatar'][]
}

function Avatar(props: Props) {
  const { avatars, size } = props
  const imageSize = sizeMap[size ?? 'medium']

  if (avatars.length === 1) {
    const avatar = avatars[0]

    return (
      <CldImage
        src={avatar}
        width={imageSize}
        height={imageSize}
        alt={avatar}
        className="bg-white-100 rounded-full object-cover"
      />
    )
  }

  return (
    <div className="flex items-center">
      {avatars.map((avatar, index) => (
        <div
          key={avatar}
          className={cn(
            'bg-white-100 rounded-full ring-2 ring-white dark:ring-gray-900',
            index > 0 && overlapVariants({ size })
          )}
          style={{ zIndex: avatars.length - index }}
        >
          <CldImage
            src={avatar}
            width={imageSize}
            height={imageSize}
            alt={avatar ?? expectUnreachable('avatar must exist')}
            className="rounded-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}

export default Avatar
