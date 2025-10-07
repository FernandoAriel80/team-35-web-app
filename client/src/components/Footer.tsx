function Footer() {
  return (
    <footer className='bg-gray-100 py-6 text-sm text-gray-600 mx-auto flex flex-col items-center space-y-2'>
      <div className='w-full flex justify-center gap-5 sm:gap-10 px-3 text-center'>
        <a
          href='#'
          className='hover:text-blue-600 w-fit'
        >
          Política de Privacidad
        </a>
        <a
          href='#'
          className='hover:text-blue-600  w-fit'
        >
          Contacto
        </a>
        <a
          href='#'
          className='hover:text-blue-600  w-fit'
        >
          Términos y Condiciones
        </a>
      </div>
      <p>© 2025 Financia. Todos los derechos reservados.</p>
    </footer>
  )
}

export default Footer
