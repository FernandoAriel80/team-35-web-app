import { createFileRoute } from '@tanstack/react-router'
import { AboutUs } from '../pages/Public/AboutUs'

export const Route = createFileRoute('/about-us')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AboutUs />
}
