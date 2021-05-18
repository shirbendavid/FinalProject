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
    path: '/advanced',
    name: 'advanced',
    component: () => import('./pages/advancedGamePage'),
  },

  {
    path: '/upload',
    name: 'upload',
    component: () => import('./pages/uploadPage'),
  },
  {
    path: '/loginManagement',
    name: 'loginManagement',
    component: () => import('./management/pages/loginManagePage'),
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
  {
    path: '/about',
    name: 'about',
    component: () => import('./pages/About'),
  },
  {
    path: '/maintenance',
    name: 'maintenance',
    component: () => import('./pages/maintenancePage'),
  },
    {
    path: '/leaderboard',
    name: 'leaderboard',
    component: () => import('./pages/leaderBoard'),
  },
  {
    path: '/afterLogin',
    name: 'afterLogin',
    component: () => import('./pages/afterLogin'),
  },
]

export default routes