import { createFileRoute, redirect } from '@tanstack/react-router'
import { PymeRegister } from '../../pages/Form/PymeRegister'

export const Route = createFileRoute('/form/pyme-register')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
})

function RouteComponent() {
  return <PymeRegister />
}
