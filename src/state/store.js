import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import uiReducer from '../features/ui/uiSlice'
import projectsReducer from '../features/projects/projectsSlice'
import notificationBarReducer from '../features/notificationBar/notificationBarSlice'
import canvasReducer from '../features/canvas/canvasSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    ui: uiReducer,
    notificationBar: notificationBarReducer,
    canvas: canvasReducer
  }
})
