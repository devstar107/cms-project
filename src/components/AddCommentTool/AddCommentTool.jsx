import React, { useState, useEffect, useRef } from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import { AddCommentIcon } from '../../elements/icons/icons'
import Icon from '../common/Icon/Icon'
import './AddCommentTool.scss'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import StopIcon from '@material-ui/icons/Stop'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import { ARROW, CIRCLE, SQUARE } from '../../constants/constants'

const AddCommentTool = ({ onToolClick }) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }

  function handleListKeyDown (event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  const menuItemClicked = (event, value) => {
    onToolClick(value)
    handleClose(event)
  }
  return (
    <div className='add-comment'>
      <div
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
      >
        <Icon item={<AddCommentIcon />} />
      </div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                                placement === 'bottom'
                                  ? 'center top'
                                  : 'center bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  className='add-comment_tools'
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    onClick={(e) =>
                      menuItemClicked(e, ARROW)}
                  >
                    <ArrowUpwardIcon className='arrow-tool' />
                  </MenuItem>
                  <MenuItem
                    onClick={(e) =>
                      menuItemClicked(e, CIRCLE)}
                  >
                    <FiberManualRecordIcon />
                  </MenuItem>
                  <MenuItem
                    onClick={(e) =>
                      menuItemClicked(e, SQUARE)}
                  >
                    <StopIcon />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}
export default AddCommentTool
