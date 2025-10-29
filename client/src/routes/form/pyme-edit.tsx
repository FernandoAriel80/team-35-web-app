import { createFileRoute } from '@tanstack/react-router'
import { PymeEdit } from '../../pages/Form/PymeEdit'

export const Route = createFileRoute('/form/pyme-edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PymeEdit />
}
