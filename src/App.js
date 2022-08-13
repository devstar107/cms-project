import React from 'react'
import AppRouter from './router/Router'
import CssBaseline from '@material-ui/core/CssBaseline'
import GlobalStyles from './GlobalStyles'
import './assets/scss/index.scss'
import SecuredApp from './components/SecuredApp'
import NotificationBar from './components/common/NotificationBar/NotificationBar'

function App () {
  return (
    <div className='App'>
      <CssBaseline />
      <GlobalStyles />
      <SecuredApp>
        <AppRouter />
        <NotificationBar />
      </SecuredApp>
    </div>
  )
}

export default App
