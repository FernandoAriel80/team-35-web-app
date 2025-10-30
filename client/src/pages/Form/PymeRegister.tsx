import { useNavigate } from '@tanstack/react-router'
import { createCompany } from '../../services/companies.service'
import { PymeForm } from '../../components/pymes/PymeForm'
import type { NewCompany } from '../../interfaces'

export const PymeRegister = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleCreate = async (formData: NewCompany) => {
    if (!token) throw new Error('Token inválido')
    await createCompany(formData, token)
    navigate({ to: '/my-pymes' })
  }

  return (
    <section className='max-w-[40rem] mx-auto px-4 sm:px-0 w-full py-10'>
      <h1 className='font-bold text-3xl pb-2 text-slate-800 text-center'>
        Registrar PyME
      </h1>
      <p className='text-md text-slate-600 text-center mb-6'>
        Completa los datos para registrar una nueva empresa.
      </p>
      <PymeForm
        mode='create'
        onSubmit={handleCreate}
      />
    </section>
  )
}
