import React, { useState, useLayoutEffect } from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import './ThreeDView.scss'

const ThreeDView = ({ images, frame, setFrame }) => {
  const [isDragging, setDragging] = useState(false)
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 })
  const [width, height] = useWindowSize()

  const handleMouseDown = (ev) => {
    setStartPoint({
      x: ev.clientX,
      y: ev.clientY,
      frame
    })
    setDragging(true)
  }
  const handleMouseMove = (ev) => {
    if (isDragging) {
      const angle = Math.atan2(
        ev.clientY - startPoint.y,
        ev.clientX - startPoint.x
      )
      const fullRad = width / 2
      const diff = ev.clientX - startPoint.x
      const index =
        (startPoint.frame +
          (Math.ceil((images.length / fullRad) * diff) % images.length) +
          (diff > 0 ? 0 : images.length)) %
        images.length
      setFrame(index)
    }
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={(ev) => setDragging(false)}
      onMouseLeave={(ev) => setDragging(false)}
      className='main'
    >
      {images.map((img, i) => (
        <img
          className={`${
            i === frame ? 'single-image show' : 'single-image  hide'
          }`}
          src={img}
          width={width}
          height={width / 1.779}
        />
      ))}
    </div>
  )
}

export default ThreeDView
