import { createFileRoute, redirect } from '@tanstack/react-router'

import { Requests } from '../pages/Requests/Requests'

export const Route = createFileRoute('/requests')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
})

function RouteComponent() {
  return <Requests />
}
