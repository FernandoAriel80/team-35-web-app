import { Outlet, createRootRoute } from '@tanstack/react-router'
import Footer from '../components/Footer'
import Header from '../components/Header'

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />

      <div className='bg-slate-200 text-slate-950'>
        <Outlet />
      </div>

      <Footer />
    </>
  ),
})
