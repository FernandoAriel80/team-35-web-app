import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { useAuth } from '../hooks/useAuth'
import { type AuthStatus } from '../stores/slices/auth.slice'

import Footer from '../components/Footer'
import Header from '../components/Header'
import { Dashboard } from '../pages/Admin/Dashboard'

import type { User } from '../interfaces'

interface MyRouterContext {
  auth: {
    user: User | null
    status: AuthStatus
    isAuthenticated: boolean
  }
}

const Layout = () => {
  const { user } = useAuth()

  const isAdmin = user?.role === 'ADMIN'

  return (
    <div className='flex flex-col min-h-screen' >
      {!isAdmin && <Header />}

      <div className='bg-slate-200 w-full text-slate-950 flex-1 flex flex-col'>
        {
          !isAdmin
            ? (<Outlet />)
            : (<Dashboard />)
        }
      </div>

      {!isAdmin && <Footer />}
    </div >
  )
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Layout,
})
