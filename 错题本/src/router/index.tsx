import NotFound from "../pages/404/404"
import Home from "../pages/home/Home"
import { Navigate } from 'react-router-dom'
import { lazy } from "react"

interface RouteItem {
  path: string
  element: React.ReactNode
  children?: RouteItem[]
  isAuth?: boolean
}

const Exam = lazy(() => import('../pages/exam/Exam'))
const History = lazy(() => import('../pages/history/History'))
const Mistake = lazy(() => import('../pages/mistake/Mistake'))

const routes: RouteItem[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/exam',
    element: <Exam />
  },
  {
    path: '/history',
    element: <History />
  },
  {
    path: '/mistake',
    element: <Mistake />
  },
  {
    path: '/404',
    element: <NotFound />
  },
  {
    path: '*',
    element: <Navigate to ="/404" />
  }
]


export default routes