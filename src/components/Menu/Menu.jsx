import React from 'react'
import './Menu.scss'
import {
  AddIcon,
  CDNIcon,
  ContentIcon,
  DashIcon,
  GarageIcon,
  HideIcon,
  MenuIcon,
  RODIcon,
  ShowIcon,
  HomeIcon
} from '../../elements/icons/icons'
import Button from '../../components/common/Button/Button'
import { menu } from '../../constants/ui'
import { clickMenu } from '../../features/ui/uiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const {
  CONTENT_MENUS,
  GALLERY_MENUS,
  DASHBOARD_MENUS,
  ADD_MENU,
  SHOW_MENU,
  HIDE_MENU,
  ADD_SPRITE_NANO_MENU,
  VIEW_NANO_MENU
} = menu

const Menu = ({ status }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  // const ui = useSelector((state) => state.ui.presentation.slider);
  const contentMenu = [
    {
      icon: <DashIcon />,
      title: 'Dash',
      href: ''
    },
    {
      icon: <AddIcon />,
      title: 'Add',
      href: '',
      onClick: () => dispatch(clickMenu(ADD_MENU))
    },
    {
      icon: <ShowIcon />,
      title: 'Show',
      href: '',
      onClick: () => dispatch(clickMenu(SHOW_MENU))
    },
    {
      icon: <HideIcon />,
      title: 'Hide',
      href: '',
      onClick: () => dispatch(clickMenu(HIDE_MENU))
    },
    { icon: <MenuIcon />, title: 'Menu', href: '' }
  ]

  const galleryMenu = [
    { icon: <HomeIcon />, title: 'Home', href: '' },
    { icon: <AddIcon />, title: 'Add', href: '' },
    { icon: <ShowIcon />, title: 'Show', href: '' },
    { icon: <HideIcon />, title: 'Hide', href: '' },
    { icon: <MenuIcon />, title: 'Menu', href: '' }
  ]

  const dashboardMenu = [
    { icon: <GarageIcon />, title: 'Garage', href: '' },
    { icon: <ContentIcon />, title: 'Content', href: '' },
    { icon: <CDNIcon />, title: 'CDN', href: '' },
    { icon: <RODIcon />, title: 'ROD', href: '' },
    { icon: <MenuIcon />, title: 'Menu', href: '' }
  ]

  const projectDetailMenu = [
    {
      icon: <HomeIcon />,
      title: 'Home',
      href: '/projects',
      onClick: () => history.push('/projects')
    },
    {
      icon: <MenuIcon />,
      title: 'Menu',
      href: ''
    }
  ]

  const getMenuItems = (status) => {
    switch (status) {
      case CONTENT_MENUS:
        return contentMenu
        break
      case GALLERY_MENUS:
        return galleryMenu
        break
      case DASHBOARD_MENUS:
        return dashboardMenu
        break
      case 'PROJECT_DETAIL_MENUS':
        return projectDetailMenu
        break

      default:
        return []
        break
    }
  }
  const menuItems = getMenuItems(status)
  return (
    <div className='menuWrapper'>
      {menuItems.map((item, index) => (
        <Button
          key={index}
          className='menuItem'
          icon={item.icon}
          text={item.title}
          onClick={item.onClick}
          {...item}
        />
      ))}
    </div>
  )
}

export default Menu
