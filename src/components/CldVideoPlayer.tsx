'use client'

import { cn } from '@/utils'
import {
  type CldVideoPlayerProps,
  CldVideoPlayer as CldVideoPlayerDefault,
  getCldImageUrl,
} from 'next-cloudinary'
import 'next-cloudinary/dist/cld-video-player.css'

interface Props extends CldVideoPlayerProps {
  likeGif?: boolean
}

function CldVideoPlayer(props: Props) {
  const { likeGif, className, width, height, ...rest } = props

  const gifProps = likeGif
    ? {
        autoplay: 'on-scroll',
        muted: true,
        loop: true,
        controls: false,
      }
    : {}

  return (
    <div className="my-6" style={{ maxWidth: `${width}px` }}>
      <CldVideoPlayerDefault
        className={cn(className, 'rounded')}
        aiHighlightsGraph
        pictureInPictureToggle
        logo={{ imageUrl: getCldImageUrl({ src: 'brand-icon' }), onClickUrl: '/' }}
        width={width}
        height={height}
        {...gifProps}
        {...rest}
      />
    </div>
  )
}

export default CldVideoPlayer
