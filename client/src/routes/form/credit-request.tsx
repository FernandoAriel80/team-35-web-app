import { createFileRoute, redirect } from '@tanstack/react-router'
import { CreditRequest } from '../../pages/Form/CreditRequest'

export const Route = createFileRoute('/form/credit-request')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
})

function RouteComponent() {
  return <CreditRequest />
}
