'use client'

import { CldImage as CldImageDefault, type CldImageProps } from 'next-cloudinary'

function CldImage(props: CldImageProps) {
  return <CldImageDefault {...props} />
}

export default CldImage
