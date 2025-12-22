import { useRoutes } from 'react-router-dom'
import router from './router'
import { Suspense } from 'react'
import { Spin } from 'antd'

const App = () => {
  const routes = useRoutes(router)
  
  return (
    <Suspense fallback={<Spin fullscreen />}>
      {routes}
    </Suspense>
  )
}

export default App