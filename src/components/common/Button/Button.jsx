import React from 'react'
import clsx from 'clsx'
import Tooltip from '@material-ui/core/Tooltip'
import './Button.scss'

const Button = (props) => {
  const {
    text,
    onClick,
    active,
    className,
    iconClassName,
    icon,
    data,
    toolTipText,
    toolTipOpen = false,
    toolTipArrow = false,
    ...input
  } = props

  return (
    <Tooltip
      disableFocusListener
      title={toolTipText}
      open={toolTipOpen}
      arrow={toolTipArrow}
    >
      <button
        className={clsx(
          'commonButton',
          className || '',
          active ? 'active' : ''
        )}
        onClick={onClick || undefined}
        {...input}
      >
        {icon && <span className='icon'>{icon}</span>}
        {text && <p>{text}</p>}
        {props.children && props.children}
      </button>
    </Tooltip>
  )
}

export default Button
