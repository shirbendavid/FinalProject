import Main from './pages/mainPage'
import NotFound from './pages/NotFoundPage'

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('./pages/registerPage'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./pages/loginPage'),
  },
  {
    path: '/observation',
    name: 'observation',
    component:  () => import('./pages/observationPage'),
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: () => import('./pages/rankImagePage'),
  },
  {
    path: '/game',
    name: 'game',
    component: () => import('./pages/gamePage'),
  },

  {
    path: '/upload',
    name: 'upload',
    component: () => import('./pages/uploadPage'),
  },
  {
    path: '/management',
    name: 'management',
    component: () => import('./management/pages/ManagementPage'),
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFound,
  },
]

export default routes