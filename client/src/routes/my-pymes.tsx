import { createFileRoute, redirect } from '@tanstack/react-router'
import { MyPymes } from '../pages/Pymes/MyPymes'

export const Route = createFileRoute('/my-pymes')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
})

function RouteComponent() {
  return <MyPymes />
}
