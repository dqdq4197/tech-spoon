import { cn, expectUnreachable } from '@/utils'
import { cva } from 'class-variance-authority'

import Image from 'next/image'
import heesuAvatar from 'data/authors/heesu/avatar.png'
import type { Author } from 'contentlayer/generated'

/**
 * doubleAvatarRatio = 0.7
 * tripleAvatarRatio = 0.6
 */

const avatarContainerVariants = cva('relative', {
  variants: {
    size: {
      small: 'size-6',
      medium: 'size-8',
      large: 'size-10',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
})

const getSingleAvatarSize = (size: Props['size']) => {
  switch (size) {
    case 'small':
      return 24
    case 'medium':
      return 32
    case 'large':
      return 40
    default:
      expectUnreachable()
  }
}

const doubleAvatarStyle = cva(
  'absolute rounded-full bg-white-100 object-cover shadow-[0_0_0_1px_rgba(0,0,0,0.12)]'
)

const getDoubleAvatarSize = (size: Props['size']) => {
  switch (size) {
    case 'small':
      return 16.8
    case 'medium':
      return 22.4
    case 'large':
      return 28
    default:
      expectUnreachable()
  }
}

const tripleAvatarStyle = cva(
  'absolute rounded-full bg-white-100 object-cover shadow-[0_0_0_1px_rgba(0,0,0,0.12)]'
)

const getTripleAvatarSize = (size: Props['size']) => {
  switch (size) {
    case 'small':
      return 14.4
    case 'medium':
      return 19.2
    case 'large':
      return 24
    default:
      expectUnreachable()
  }
}

interface Props {
  avatars: Author['avatar'][]
  size?: 'small' | 'medium' | 'large'
}

function Avatar(props: Props) {
  const { avatars, size = 'medium' } = props
  const slicedAvatars = avatars.slice(0, 3)

  if (slicedAvatars.length === 1) {
    const singleAvatarSize = getSingleAvatarSize(size)
    return (
      <Image
        src={heesuAvatar}
        width={singleAvatarSize}
        height={singleAvatarSize}
        alt={slicedAvatars[0] ?? expectUnreachable('avatar must exist')}
        className="bg-white-100 rounded-full object-cover"
      />
    )
  }

  if (slicedAvatars.length === 2) {
    const doubleAvatarSize = getDoubleAvatarSize(size)

    return (
      <div className={avatarContainerVariants({ size })}>
        <Image
          src={heesuAvatar}
          width={doubleAvatarSize}
          height={doubleAvatarSize}
          alt={slicedAvatars[0] ?? expectUnreachable('avatar must exist')}
          className={cn(doubleAvatarStyle(), 'top-0 left-0 z-20')}
        />
        <Image
          src={heesuAvatar}
          width={doubleAvatarSize}
          height={doubleAvatarSize}
          alt={slicedAvatars[1] ?? expectUnreachable('avatar must exist')}
          className={cn(doubleAvatarStyle(), 'right-0 bottom-0 z-10')}
        />
      </div>
    )
  }

  const tripleAvatarSize = getTripleAvatarSize(size)

  return (
    <div className={avatarContainerVariants({ size })}>
      <Image
        src={heesuAvatar}
        width={tripleAvatarSize}
        height={tripleAvatarSize}
        alt={slicedAvatars[0] ?? expectUnreachable('avatar must exist')}
        className={cn(tripleAvatarStyle(), 'top-0 left-1/2 z-30 -translate-x-1/2')}
      />
      <Image
        src={heesuAvatar}
        width={tripleAvatarSize}
        height={tripleAvatarSize}
        alt={slicedAvatars[1] ?? expectUnreachable('avatar must exist')}
        className={cn(tripleAvatarStyle(), 'bottom-0 left-0 z-20')}
      />
      <Image
        src={heesuAvatar}
        width={tripleAvatarSize}
        height={tripleAvatarSize}
        alt={slicedAvatars[2] ?? expectUnreachable('avatar must exist')}
        className={cn(tripleAvatarStyle(), 'right-0 bottom-0 z-10')}
      />
    </div>
  )
}

export default Avatar
