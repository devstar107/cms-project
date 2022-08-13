export const UnauthenticatedRoutes = [
  {
    exact: true,
    path: '/login',
    component: 'Login'
  },
  {
    exact: true,
    path: '/',
    component: 'Login'
  }
]

export const AuthenticatedRoutes = [
  {
    exact: true,
    path: '/review',
    component: 'Review'
  },

  {
    exact: true,
    path: '/projects/project/:id',
    component: 'ProjectDetail'
  },
  {
    exact: true,
    path: '/projects',
    component: 'Projects'
  }
]
