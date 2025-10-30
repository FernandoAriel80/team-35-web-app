// src/components/forms/PymeForm.tsx
import { useState, useEffect } from 'react'
import type { NewCompany, Company } from '../../interfaces'

interface PymeFormProps {
  mode: 'create' | 'edit'
  initialData?: Company | null
  onSubmit: (formData: NewCompany) => Promise<void>
  isSubmitting?: boolean
}

export const PymeForm = ({
  mode,
  initialData,
  onSubmit,
  isSubmitting = false,
}: PymeFormProps) => {
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        name: initialData.name,
        type: initialData.type,
        taxId: initialData.taxId,
        activity: initialData.activity,
        employeeCount: initialData.employeeCount,
        address: initialData.address,
        website: initialData.website || '',
        email: initialData.email,
      })
    }
  }, [mode, initialData])

  const [formData, setFormData] = useState<NewCompany>({
    name: '',
    type: '',
    taxId: '',
    activity: '',
    employeeCount: '',
    address: '',
    website: '',
    email: '',
  })

  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const companyTypes = [
    'Sociedad Anónima (S.A.)',
    'Sociedad por Acciones (SpA)',
    'Sociedad de Responsabilidad Limitada (Ltda.)',
    'Empresa Individual de Responsabilidad Limitada (E.I.R.L.)',
    'Otro',
  ]

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const newValue =
      type === 'number' && value !== '' ? parseInt(value, 10) : value
    setFormData((prev) => ({ ...prev, [name]: newValue }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage(null)
    try {
      await onSubmit(formData)
      setMessage({
        type: 'success',
        text:
          mode === 'create'
            ? 'PyME creada con éxito.'
            : 'PyME actualizada con éxito.',
      })
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err.message || 'Error al guardar la PyME.',
      })
    }
  }

  const inputStyle =
    'text-sm font-normal outline w-full rounded-sm outline-slate-300 p-2 mt-1 transition-colors duration-200 focus:outline-blue-500 focus:ring-1 focus:ring-blue-500'
  const activeStyle = 'bg-slate-200 text-slate-800'
  const requiredLabel = <span className='text-red-500 text-base ml-1'>*</span>

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white rounded-xl flex flex-col p-8 border border-slate-200 shadow-xl'
    >
      <div className='grid sm:grid-cols-2 gap-6'>
        <div>
          <label
            htmlFor='name'
            className='text-xs text-slate-950 font-medium'
          >
            Nombre de la empresa
          </label>
          <input
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='text-sm font-normal outline w-full rounded-sm outline-slate-300 p-2 mt-1 focus:outline-blue-500 focus:ring-1 focus:ring-blue-500'
            type='text'
            placeholder='Ej: Innovatech'
            required
          />
        </div>

        <div>
          <label
            htmlFor='type'
            className='text-xs text-slate-950 font-medium'
          >
            Tipo de empresa
          </label>
          <select
            id='type'
            name='type'
            value={formData.type}
            onChange={handleChange}
            className={`${inputStyle} appearance-none ${formData.type ? activeStyle : 'bg-white'}`}
            required
          >
            <option
              value=''
              disabled
            >
              Selecciona un tipo
            </option>
            {companyTypes.map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor='taxId'
            className='text-xs text-slate-950 font-medium'
          >
            RUT / Tax ID {requiredLabel}
          </label>
          <input
            id='taxId'
            name='taxId'
            value={formData.taxId}
            onChange={handleChange}
            className={inputStyle}
            type='text'
            placeholder='Ej: 76.123.456-7'
            required
          />
        </div>

        <div>
          <label
            htmlFor='email'
            className='text-xs text-slate-950 font-medium'
          >
            Correo electrónico {requiredLabel}
          </label>
          <input
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className={inputStyle}
            type='email'
            placeholder='Ej: contacto@innovatech.cl'
            required
          />
        </div>

        <div>
          <label
            htmlFor='activity'
            className='text-xs text-slate-950 font-medium'
          >
            Actividad o rubro {requiredLabel}
          </label>
          <input
            id='activity'
            name='activity'
            value={formData.activity}
            onChange={handleChange}
            className={inputStyle}
            type='text'
            placeholder='Ej: Servicios de software'
            required
          />
        </div>

        <div>
          <label
            htmlFor='employeeCount'
            className='text-xs text-slate-950 font-medium'
          >
            Número de empleados {requiredLabel}
          </label>
          <input
            id='employeeCount'
            name='employeeCount'
            value={formData.employeeCount}
            onChange={handleChange}
            className={inputStyle}
            type='number'
            min='1'
            placeholder='Ej: 25'
            required
          />
        </div>

        <div className='sm:col-span-2'>
          <label
            htmlFor='address'
            className='text-xs text-slate-950 font-medium'
          >
            Dirección de la sede principal {requiredLabel}
          </label>
          <input
            id='address'
            name='address'
            value={formData.address}
            onChange={handleChange}
            className={inputStyle}
            type='text'
            placeholder='Ej: Av. Providencia 1234, Santiago'
            required
          />
        </div>

        <div className='sm:col-span-2'>
          <label
            htmlFor='website'
            className='text-xs text-slate-950 font-medium'
          >
            Sitio web (opcional)
          </label>
          <input
            id='website'
            name='website'
            value={formData.website}
            onChange={handleChange}
            className={inputStyle}
            type='url'
            placeholder='Ej: https://innovatech.cl'
          />
        </div>
      </div>

      {message && (
        <div
          className={`mt-6 p-3 rounded-lg text-sm font-medium ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        type='submit'
        disabled={isSubmitting}
        className={`py-3 px-4 rounded-xl text-white font-semibold transition mt-10 w-full ${
          isSubmitting
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
        }`}
      >
        {isSubmitting
          ? 'Guardando...'
          : mode === 'create'
            ? 'Registrar PyME'
            : 'Guardar Cambios'}
      </button>
    </form>
  )
}
