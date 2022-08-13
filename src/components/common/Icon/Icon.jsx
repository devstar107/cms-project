import React from 'react'
import clsx from 'clsx'
import './Icon.scss'
const Icon = (props) => {
  const { item, onClick, active, className, ...input } = props
  return (
    <span
      className={
        clsx('commonIcon', className || '', active ? 'active' : '')
      }
      onClick={onClick || undefined}
      {...input}
    >
      {item || ''}
      {props.children}
    </span>
  )
}

export default Icon
