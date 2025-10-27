import type { Company } from '../../interfaces/company.interface'
import { PymeRow } from './PymeRow'

interface PymesTableProps {
  companies: Company[]
  onViewDetails: (pyme: Company) => void
  onDeleteClick: (pyme: Company) => void
}

export const PymesTable = ({
  companies,
  onViewDetails,
  onDeleteClick,
}: PymesTableProps) => {
  return (
    <table className='min-w-full divide-y divide-gray-200'>
      <thead className='bg-slate-50'>
        <tr>
          <th className='px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider'>
            Nombre
          </th>
          <th className='px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider'>
            RUT / Tax ID
          </th>
          <th className='px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell'>
            Tipo
          </th>
          <th className='px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden md:table-cell'>
            Empleados
          </th>
          <th className='px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider'>
            Acciones
          </th>
        </tr>
      </thead>
      <tbody className='bg-white divide-y divide-gray-200'>
        {companies.map((pyme) => (
          <PymeRow
            key={pyme.id}
            pyme={pyme}
            onViewDetails={onViewDetails}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </tbody>
    </table>
  )
}
