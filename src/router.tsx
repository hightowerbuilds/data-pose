import { createRouter, createRootRoute, createRoute } from '@tanstack/react-router'
import Root from './routes/__root'
import HomePage from './pages/HomePage'
import MusicTranspositionPage from './pages/MusicTranspositionPage'
import DataChartsPage from './pages/DataChartsPage'

const rootRoute = createRootRoute({
  component: Root,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
})

const musicTranspositionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/music-transposition',
  component: MusicTranspositionPage,
})

const dataChartsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/data-charts',
  component: DataChartsPage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  musicTranspositionRoute,
  dataChartsRoute,
])

export const router = createRouter({ 
  routeTree,
  defaultPreload: 'intent'
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
} 