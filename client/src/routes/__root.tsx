import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { type AuthStatus } from "../stores/slices/auth.slice";

import Footer from "../components/Footer";
import Header from "../components/Header";

import type { User } from "../interfaces";

interface MyRouterContext {
  auth: {
    user: User | null,
    status: AuthStatus,
    isAuthenticated: boolean
  }
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Header />
      <div className='bg-slate-200 text-slate-950 min-h-dvh'>
        <Outlet />
      </div>

      <Footer />
    </>
  )
})