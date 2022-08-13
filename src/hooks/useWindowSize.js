import React, { useLayoutEffect, useState } from 'react'

export default function useWindowSize () {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize () {
      const mainEle = document.querySelector('.main')
      if (mainEle?.getBoundingClientRect()) {
        const { left, top, width, height } = mainEle.getBoundingClientRect()
        setSize([width, height])
      }
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}
