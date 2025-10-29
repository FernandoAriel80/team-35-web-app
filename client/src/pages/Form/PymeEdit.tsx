import { useNavigate, useRouter } from '@tanstack/react-router'
import { PymeForm } from '../../components/pymes/PymeForm'
import { updateCompany } from '../../services/companies.service'
import type { Company } from '../../interfaces'

export const PymeEdit = () => {
  const navigate = useNavigate()
  const router = useRouter()

  // 👇 Aquí recuperamos la pyme pasada desde el Link
  const location = router.state.location
  const company = (location.state as { company?: Company })?.company

  const token = localStorage.getItem('token')

  const handleUpdate = async (formData: Company) => {
    if (!token) throw new Error('Token inválido')
    if (!company?.id) throw new Error('No se encontró el ID de la empresa')

    await updateCompany(Number(company.id), formData, token)
    navigate({ to: '/my-pymes' })
  }

  if (!company) {
    return (
      <p className='text-center py-20 text-red-600'>
        No se encontró información de la PyME.
      </p>
    )
  }

  return (
    <section className='max-w-[40rem] mx-auto px-4 sm:px-0 w-full py-10'>
      <h1 className='font-bold text-3xl pb-2 text-slate-800 text-center'>
        Editar PyME
      </h1>
      <p className='text-md text-slate-600 text-center mb-6'>
        Actualiza los datos de tu empresa registrada.
      </p>
      <PymeForm
        mode='edit'
        initialData={company}
        onSubmit={handleUpdate}
      />
    </section>
  )
}
