import { useState } from 'react'
import type { Company } from '../../interfaces'

export const CreditRequest = () => {
  const pymes = [
    {
      name: 'InovaTech Solutions',
      type: 'Sociedad limitada',
      taxId: '76.123.456-7',
      activity: 'Servicios de software',
      employeeCount: 25,
      address: 'Av. Providencia 1234, Santiago',
      website: 'https://innovatech.cl',
      email: 'contacto@innovatech.cl',
    },
    {
      name: 'EcoVerde Ltda',
      type: 'Sociedad por acciones',
      taxId: '78.987.654-3',
      activity: 'Producción agrícola sustentable',
      employeeCount: 12,
      address: 'Camino Los Olivos 455, Rancagua',
      website: 'https://ecoverde.cl',
      email: 'info@ecoverde.cl',
    },
    {
      name: 'ConstruMax Chile',
      type: 'E.I.R.L.',
      taxId: '77.555.444-1',
      activity: 'Construcción e infraestructura',
      employeeCount: 48,
      address: 'Av. Los Presidentes 2211, La Florida',
      website: 'https://construmax.cl',
      email: 'ventas@construmax.cl',
    },
  ]

  const [selectedPyme, setSelectedPyme] = useState<Company | null>(null)

  const inputStyle =
    'text-sm font-normal outline w-full rounded-t-sm outline-slate-300 p-2 mt-1 transition-colors duration-200'
  const activeStyle = 'bg-slate-200 text-slate-800'
  const disabledStyle = 'bg-slate-300 text-slate-600 cursor-not-allowed'

  return (
    <section className='flex flex-1 items-center justify-center bg-slate-200'>
      <div className='w-full max-w-[35rem] h-fit bg-slate-100 rounded-xl flex flex-col items-center p-8 border border-slate-200 shadow'>
        <header className='text-center mb-6'>
          <h1 className='font-bold text-2xl'>Solicitud de Crédito para tu PYME</h1>
          <p className='text-xs text-slate-600'>
            Selecciona tu empresa para visualizar su información.
          </p>
        </header>

        <footer className='w-full flex flex-col gap-4'>
          {/* Dropdown selección PYME */}
          <div>
            <label className='text-xs text-shadow-slate-950'>Selecciona tu PYME</label>
            <select
              className={`${inputStyle} ${activeStyle}`}
              onChange={(e) => {
                const pyme = pymes.find((p) => p.name === e.target.value)
                setSelectedPyme(pyme || null)
              }}
              defaultValue=''
            >
              <option value='' disabled>
                -- Selecciona una empresa --
              </option>
              {pymes.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Campos de solo lectura */}
          <div>
            <label className='text-xs text-shadow-slate-950'>Nombre de la empresa</label>
            <input
              disabled
              value={selectedPyme?.name || ''}
              className={`${inputStyle} ${disabledStyle}`}
              type='text'
              placeholder='Ej: InovaTech Solutions'
            />
          </div>

          <div>
            <label className='text-xs text-shadow-slate-950'>Tipo de empresa</label>
            <input
              disabled
              value={selectedPyme?.type || ''}
              className={`${inputStyle} ${disabledStyle}`}
              type='text'
              placeholder='Ej: Sociedad limitada'
            />
          </div>

          <div>
            <label className='text-xs text-shadow-slate-950'>RUT / Tax ID</label>
            <input
              disabled
              value={selectedPyme?.taxId || ''}
              className={`${inputStyle} ${disabledStyle}`}
              type='text'
              placeholder='Ej: 76.123.456-7'
            />
          </div>

          <div>
            <label className='text-xs text-shadow-slate-950'>Actividad o rubro</label>
            <input
              disabled
              value={selectedPyme?.activity || ''}
              className={`${inputStyle} ${disabledStyle}`}
              type='text'
              placeholder='Ej: Servicios de software'
            />
          </div>

          <div>
            <label className='text-xs text-shadow-slate-950'>Número de empleados</label>
            <input
              disabled
              value={selectedPyme?.employeeCount || ''}
              className={`${inputStyle} ${disabledStyle}`}
              type='number'
              placeholder='Ej: 25'
            />
          </div>

          <div>
            <label className='text-xs text-shadow-slate-950'>Dirección</label>
            <input
              disabled
              value={selectedPyme?.address || ''}
              className={`${inputStyle} ${disabledStyle}`}
              type='text'
              placeholder='Ej: Av. Providencia 1234, Santiago'
            />
          </div>

          <div>
            <label className='text-xs text-shadow-slate-950'>Sitio web (opcional)</label>
            <input
              disabled
              value={selectedPyme?.website || ''}
              className={`${inputStyle} ${disabledStyle}`}
              type='url'
              placeholder='Ej: https://innovatech.cl'
            />
          </div>

          <div>
            <label className='text-xs text-shadow-slate-950'>Correo electrónico</label>
            <input
              disabled
              value={selectedPyme?.email || ''}
              className={`${inputStyle} ${disabledStyle}`}
              type='email'
              placeholder='Ej: contacto@innovatech.cl'
            />
          </div>
        </footer>
      </div>
    </section>
  )
}