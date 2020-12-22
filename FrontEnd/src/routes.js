import Main from './pages/mainPage'
import NotFound from './pages/NotFoundPage'
import Observation from './pages/observationPage'
// import NotFound from './pages/NotFoundPage'


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
    component: Observation,
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: () => import('./pages/rankImagePage'),
  },
//   {
//     path: '/search',
//     name: 'search',
//     component: () => import('./pages/SearchPage'),
//   },
 
//   {
//     path: '/about',
//     name: 'about',
//     component: () => import('./pages/AboutPage'),
//   },

  {
    path: '*',
    name: 'notFound',
    component: NotFound,
  },
]

export default routes