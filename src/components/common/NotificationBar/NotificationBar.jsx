import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { useSelector, useDispatch } from 'react-redux'
import { setCloseNotificationBar } from '../../../features/notificationBar/notificationBarSlice'

export default function NotificationBar ({
  vertical = 'top',
  horizontal = 'right'
}) {
  const { open, message } = useSelector((state) => state.notificationBar)

  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(setCloseNotificationBar())
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
      />
    </div>
  )
}
