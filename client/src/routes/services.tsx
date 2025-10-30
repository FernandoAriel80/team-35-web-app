import { createFileRoute } from '@tanstack/react-router'
import { Services } from '../pages/Public/Services'

export const Route = createFileRoute('/services')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Services />
}
