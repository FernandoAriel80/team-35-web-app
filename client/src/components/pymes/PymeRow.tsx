import { Link } from '@tanstack/react-router'
import type { Company } from '../../interfaces'

interface PymeRowProps {
  pyme: Company
  onViewDetails: (pyme: Company) => void
  onDeleteClick: (pyme: Company) => void
}

export const PymeRow = ({
  pyme,
  onViewDetails,
  onDeleteClick,
}: PymeRowProps) => {
  const editRoute = `/form/pyme-edit/${pyme.id}`

  return (
    <tr className='border-b hover:bg-slate-50 transition duration-150'>
      <td className='p-4 font-medium text-slate-800'>{pyme.name}</td>
      <td className='p-4 text-sm text-slate-600'>{pyme.taxId}</td>
      <td className='p-4 text-sm text-slate-600 hidden sm:table-cell'>
        {pyme.type}
      </td>
      <td className='p-4 text-sm text-slate-600 hidden md:table-cell'>
        {pyme.employeeCount}
      </td>
      <td className='p-4 flex flex-wrap gap-2'>
        <button
          onClick={() => onViewDetails(pyme)}
          className='text-blue-600 hover:text-blue-800 font-semibold text-sm transition duration-150 cursor-pointer'
        >
          🔍 Detalles
        </button>
        <Link
          to={editRoute}
          className='text-yellow-600 hover:text-yellow-800 font-semibold text-sm transition duration-150'
        >
          📝 Editar
        </Link>
        <button
          onClick={() => onDeleteClick(pyme)}
          className='text-red-600 hover:text-red-800 font-semibold text-sm transition duration-150 cursor-pointer'
        >
          🗑️ Eliminar
        </button>
      </td>
    </tr>
  )
}
