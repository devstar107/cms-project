import React from 'react'
import './ContentHeader.scss'

const ContentHeader = (props) => {
  const { name, status } = props
  return (
    <div className='header'>
      <div className='header_projectName'>{name && <p>{name}</p>}</div>
      <div className='header_status'> {status && <p>{`Status: ${status}`}</p>}</div>
    </div>
  )
}

export default ContentHeader
