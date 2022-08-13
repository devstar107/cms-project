import React from 'react'
import './Header.scss'
import Icon from '../../components/common/Icon/Icon'
import { LogoImg } from '../../elements/icons/icons'

const Header = () => {
  return (
    <div className='header-wrapper'>
      <div className='headerLogo'>
        <Icon className='headerLogo_imgLG' item={<LogoImg />} />
      </div>
    </div>
  )
}

export default Header
