import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about-us')({
  component: AboutUs,
})

function AboutUs() {
  return <div>Hello "/aboutUs"!</div>
}
