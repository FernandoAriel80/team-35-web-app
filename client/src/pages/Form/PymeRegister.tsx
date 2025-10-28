import React, { useState } from 'react'
import type { NewCompany } from '../../interfaces'
import { Navigate } from '@tanstack/react-router'
import { createCompany, updateCompany } from '../../services/companies.service'

// Valores iniciales del formulario
const initialFormData: NewCompany = {
  name: '',
  type: '',
  taxId: '',
  activity: '',
  employeeCount: '',
  address: '',
  website: '',
  email: '',
}

export const PymeRegister = () => {
  const [formData, setFormData] = useState<NewCompany>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target

    const newValue =
      type === 'number' && value !== '' ? parseInt(value, 10) : value

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    if (
      !formData.name ||
      !formData.taxId ||
      !formData.email ||
      !formData.address ||
      !formData.activity ||
      formData.employeeCount === ''
    ) {
      setIsSubmitting(false)
      setMessage({
        type: 'error',
        text: 'Por favor, completa todos los campos obligatorios (*).',
      })
      return
    }

    setTimeout(() => {
      setIsSubmitting(false)
      return <Navigate to='/my-pymes' />
    }, 1500)
  }

  const companyTypes = [
    'Sociedad Anónima (S.A.)',
    'Sociedad por Acciones (SpA)',
    'Sociedad de Responsabilidad Limitada (Ltda.)',
    'Empresa Individual de Responsabilidad Limitada (E.I.R.L.)',
    'Otro',
  ]

  const inputStyle =
    'text-sm font-normal outline w-full rounded-sm outline-slate-300 p-2 mt-1 transition-colors duration-200 focus:outline-blue-500 focus:ring-1 focus:ring-blue-500'
  const activeStyle = 'bg-slate-200 text-slate-800'
  const requiredLabel = <span className='text-red-500 text-base ml-1'>*</span>

  return (
    <section className='flex flex-col gap-4 max-w-[40rem] mx-auto px-4 sm:px-0 w-full py-10'>
      <div className='text-center mb-6'>
        <h1 className='font-bold text-3xl pb-2 text-slate-800'>
          Registro de Nueva PYME
        </h1>
        <p className='text-md text-slate-600'>
          Completa los datos de tu empresa para comenzar a solicitar créditos.
        </p>
      </div>

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
              Nombre de la empresa {requiredLabel}
            </label>
            <input
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className={inputStyle}
              type='text'
              placeholder='Ej: InovaTech Solutions'
              required
            />
          </div>

          <div>
            <label
              htmlFor='type'
              className='text-xs text-slate-950 font-medium'
            >
              Tipo de empresa {requiredLabel}
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

        {/* Mensajes de feedback */}
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

        {/* Botón de envío */}
        <button
          type='submit'
          disabled={isSubmitting}
          className={`py-3 px-4 rounded-xl text-white font-semibold transition mt-10 w-full ${
            isSubmitting
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
          }`}
        >
          {isSubmitting ? 'Guardando...' : 'Registrar Empresa'}
        </button>
      </form>

      {/* Indicador de campos obligatorios */}
      <p className='text-xs text-slate-500 mt-4 text-center'>
        Los campos marcados con {requiredLabel} son obligatorios.
      </p>
    </section>
  )
}
