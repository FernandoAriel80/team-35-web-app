import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { companies, type Company } from '../../interfaces/company.interface'
import { PymesTable } from '../../components/pymes/PymesTable'
import { PymeDeleteModal } from '../../components/modals/PymeDeleteModal'
import { PymeDetailModal } from '../../components/modals/PymeDetailsModal'

export const MyPymes = () => {
  const hasPymes = companies.length > 0
  const registerRoute = '/form/pyme-register'

  const [selectedPyme, setSelectedPyme] = useState<Company | null>(null)
  const [pymeToDelete, setPymeToDelete] = useState<Company | null>(null)

  const handleViewDetails = (pyme: Company) => {
    setSelectedPyme(pyme)
  }

  const handleEliminateClick = (pyme: Company) => {
    setPymeToDelete(pyme)
  }

  const confirmDelete = () => {
    if (!pymeToDelete) return

    console.log(
      `[SIMULACIÓN] PyME ${pymeToDelete.name} eliminada. Se recargaría la lista.`
    )

    console.log(`Eliminando ${pymeToDelete.name}...`)

    setPymeToDelete(null)
  }

  const cancelDelete = () => {
    setPymeToDelete(null)
  }

  return (
    <section className='w-full max-w-[1200px] mx-auto flex flex-col gap-10 p-8 sm:p-20'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-semibold'>Mis PyMEs Registradas</h1>
        <p className='text-md text-slate-600'>
          Administra tus pequeños y medianos negocios.
        </p>
      </div>

      {hasPymes ? (
        <div className='bg-white p-8 rounded-xl shadow-lg border border-gray-100 overflow-x-auto'>
          <div className='flex justify-between items-center mb-6 border-b pb-4'>
            <h2 className='text-xl font-semibold text-slate-800'>
              Empresas ({companies.length})
            </h2>
            <Link
              to={registerRoute}
              className='inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition duration-150 ease-in-out'
            >
              Registrar Nueva
            </Link>
          </div>

          <PymesTable
            companies={companies}
            onViewDetails={handleViewDetails}
            onDeleteClick={handleEliminateClick}
          />
        </div>
      ) : (
        <div className='bg-white p-10 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center'>
          <svg
            className='w-16 h-16 text-gray-400 mb-4'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
            ></path>
          </svg>
          <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
            Aún no tienes PyMEs registradas.
          </h2>
          <p className='text-lg text-slate-600 mb-6'>
            Comienza ahora para acceder a todos los beneficios y servicios.
          </p>
          <Link
            to={registerRoute}
            className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-[1.02] inline-block'
          >
            ¡Registra tu primera PyME! 🚀
          </Link>
        </div>
      )}

      {selectedPyme && (
        <PymeDetailModal
          pyme={selectedPyme}
          onClose={() => setSelectedPyme(null)}
        />
      )}

      {pymeToDelete && (
        <PymeDeleteModal
          message={`¿Estás seguro que deseas eliminar permanentemente la PyME: ${pymeToDelete.name}? Esta acción no se puede deshacer.`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </section>
  )
}
