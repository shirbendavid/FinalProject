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