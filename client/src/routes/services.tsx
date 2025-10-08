import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services')({
  component: Services,
})

function Services() {
  return (
    <main className='container mx-auto py-16 px-6 text-center'>
      <h1 className='text-3xl font-bold text-gray-800 mb-4'>
        Nuestros Servicios
      </h1>
      <p className='text-gray-600 max-w-2xl mx-auto'>
        Conoce las soluciones financieras que ofrecemos para impulsar tu PYME.
      </p>
    </main>
  )
}
