import { createFileRoute } from '@tanstack/react-router'
import { Index } from '../pages/Public/Index'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Index />
}
