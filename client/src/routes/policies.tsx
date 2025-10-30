import { createFileRoute } from '@tanstack/react-router'
import { Policies } from '../pages/Public/Policies'

export const Route = createFileRoute('/policies')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Policies />
}
