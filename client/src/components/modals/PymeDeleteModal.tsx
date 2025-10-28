export const PymeDeleteModal = ({
  message,
  onConfirm,
  onCancel,
}: {
  message: string
  onConfirm: () => void
  onCancel: () => void
}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center p-4 z-[100] transition-opacity duration-300'>
      <div className='bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 transform scale-100'>
        <h3 className='text-xl font-bold text-red-600 mb-4'>
          Confirmación Requerida
        </h3>
        <p className='text-gray-700 mb-6'>{message}</p>
        <div className='flex justify-end gap-3'>
          <button
            onClick={onCancel}
            className='py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition'
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className='py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition'
          >
            Confirmar Eliminación
          </button>
        </div>
      </div>
    </div>
  )
}
