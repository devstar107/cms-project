import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import nProgress from 'nprogress'
import { createBrowserHistory } from 'history'

import { AuthenticatedRoutes, UnauthenticatedRoutes } from './configRouter'
import PublicRoute from './../components/PublicRoute'
import PrivateRoute from './../components/PrivateRoute'
import Loading from './../components/Loading'
const history = createBrowserHistory()

const Components = {}
for (const c of AuthenticatedRoutes.concat(UnauthenticatedRoutes)) {
  Components[c.component] = lazy(() =>
    import(`./../pages/${c.component}/${c.component}`)
  )
}

const Fallback = () => {
  useEffect(() => {
    nProgress.start()
    return () => {
      nProgress.done()
      nProgress.remove()
    }
  }, [])
  return null
}

const AppRouter = () => {
  const isAuthenticated = useSelector((state) => state.auth.isSignedIn)
  return (
    <BrowserRouter history={history}>
      <Switch>
        {UnauthenticatedRoutes.map((c) => {
          const C = Components[c.component]
          return (
            <Route
              key={c.path}
              exact={c.exact}
              path={c.path}
              render={(props) => (
                <PublicRoute isAuthenticated={isAuthenticated}>
                  <Suspense
                    fallback={<Fallback /> || <Loading />}
                  >
                    <C
                      {...props}
                      isAuthenticated={isAuthenticated}
                    />
                  </Suspense>
                </PublicRoute>
              )}
            />
          )
        })}
        {AuthenticatedRoutes.map((c) => {
          const C = Components[c.component]
          return (
            <Route
              key={c.path}
              exact={c.exact}
              path={c.path}
              render={(props) => (
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Suspense
                    fallback={<Fallback /> || <Loading />}
                  >
                    <C
                      {...props}
                      isAuthenticated={isAuthenticated}
                    />
                  </Suspense>
                </PrivateRoute>
              )}
            />
          )
        })}
      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter
