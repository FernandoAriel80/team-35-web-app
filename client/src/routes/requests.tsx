import { createFileRoute, redirect } from '@tanstack/react-router'

import { Request } from '../pages/Requests/Request'

export const Route = createFileRoute('/requests')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
})

function RouteComponent() {
  return <Request />
}
