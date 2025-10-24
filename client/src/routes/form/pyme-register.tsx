import { createFileRoute } from '@tanstack/react-router'
import { PymeRegister } from '../../pages/Form/PymeRegister'

export const Route = createFileRoute('/form/pyme-register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PymeRegister />
}
