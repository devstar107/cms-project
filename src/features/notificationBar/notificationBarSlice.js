import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open: false,
  vertical: 'top',
  horizontal: 'right'
}

const notificationBarSlice = createSlice({
  name: 'notificationBar',
  initialState,
  reducers: {
    setDisplayNotificationBar: (state, action) => {
      state.open = true
      state.message = action.payload
    },
    setCloseNotificationBar: (state, action) => {
      state.open = false
    }
  }
})

const { actions, reducer } = notificationBarSlice
export const { setDisplayNotificationBar, setCloseNotificationBar } = actions

export default reducer
