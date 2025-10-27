import type { Company } from '../../interfaces'

const DetailItem = ({
  label,
  value,
  isLink = false,
}: {
  label: string
  value: string
  isLink?: boolean
}) => (
  <p className='flex justify-between border-b border-gray-100 pb-1'>
    <span className='font-medium text-slate-800'>{label}:</span>
    {isLink ? (
      <a
        href={value}
        target='_blank'
        rel='noopener noreferrer'
        className='text-blue-500 hover:underline'
      >
        {value}
      </a>
    ) : (
      <span>{value}</span>
    )}
  </p>
)

export const PymeDetailModal = ({
  pyme,
  onClose,
}: {
  pyme: Company
  onClose: () => void
}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center p-4 z-50 transition-opacity duration-300'>
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 transform scale-100 transition-transform duration-300'>
        <div className='flex justify-between items-start border-b pb-3 mb-4'>
          <h3 className='text-2xl font-bold text-blue-700'>
            Detalles de {pyme.name}
          </h3>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-700 text-3xl leading-none'
          >
            &times;
          </button>
        </div>

        <div className='space-y-3 text-sm text-gray-700'>
          <DetailItem
            label='RUT / Tax ID'
            value={pyme.taxId}
          />
          <DetailItem
            label='Tipo de Empresa'
            value={pyme.type}
          />
          <DetailItem
            label='Actividad'
            value={pyme.activity}
          />
          <DetailItem
            label='Empleados'
            value={pyme.employeeCount.toString()}
          />
          <DetailItem
            label='Dirección'
            value={pyme.address}
          />
          <DetailItem
            label='Email'
            value={pyme.email}
          />
          <DetailItem
            label='Sitio Web'
            value={pyme.website || 'N/A'}
            isLink={!!pyme.website}
          />
        </div>

        <button
          onClick={onClose}
          className='w-full mt-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-150'
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}
