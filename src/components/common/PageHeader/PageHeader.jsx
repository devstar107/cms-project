import React from 'react'
import { Typography } from '@material-ui/core'
import { LogoIcon } from '../../../elements/icons/icons'

import './PageHeader.scss'

const PageHeader = () => {
  return (
    <div className='pageHeader'>
      <div className='pageHeader_logo'>
        <LogoIcon width='100%' />
      </div>
      <div className='pageHeader_userDetails'>
        <Typography variant='subtitle1' gutterBottom>
          INNOCEAN WORLDWIDE
        </Typography>
        <Typography variant='subtitle2' gutterBottom>
          User FirstName LastName
        </Typography>
      </div>
    </div>
  )
}

export default PageHeader
