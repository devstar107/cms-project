import { useState } from 'react'

export const useImages = (folder, format) => {
  const array = new Array(36).fill('')
  const initialImages = array.map(
    (img, indx) => `/${folder}/${indx + 1}.${format}`
  )

  const [images, setImages] = useState(initialImages)
  return [images, setImages]
}
