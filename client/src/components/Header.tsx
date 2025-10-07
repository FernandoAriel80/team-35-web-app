import { Link } from '@tanstack/react-router'
import { useState } from 'react'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className='bg-white shadow-sm sticky top-0 z-50'>
      <nav className='container mx-auto flex items-center justify-between py-4 px-10'>
        <Link
          to='/'
          className='flex items-center space-x-2'
        >
          <div className='w-6 h-6 bg-blue-600 rounded-sm'></div>
          <span className='font-semibold text-gray-800 text-2xl'>Financia</span>
        </Link>

        <button
          className='md:hidden text-gray-700 focus:outline-none'
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label='Abrir menú'
        >
          {menuOpen ? (
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          ) : (
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          )}
        </button>

        <ul
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } absolute md:static top-16 left-0 w-full md:w-auto flex-col md:flex-row items-center md:space-x-2 bg-white md:bg-transparent border-t md:border-0 py-4 md:py-0 shadow-md md:shadow-none md:flex text-gray-700 font-medium`}
        >
          <li>
            <Link
              to='/'
              className='block px-4 py-2 hover:text-blue-600 transition'
              onClick={() => setMenuOpen(false)}
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to='/productos'
              className='block px-4 py-2 hover:text-blue-600 transition'
              onClick={() => setMenuOpen(false)}
            >
              Productos
            </Link>
          </li>
          <li>
            <Link
              to='/recursos'
              className='block px-4 py-2 hover:text-blue-600 transition'
              onClick={() => setMenuOpen(false)}
            >
              Recursos
            </Link>
          </li>
          <li>
            <Link
              to='/contacto'
              className='block px-4 py-2 hover:text-blue-600 transition'
              onClick={() => setMenuOpen(false)}
            >
              Contacto
            </Link>
          </li>
          <div className='flex flex-col md:flex-row md:items-center gap-2 mt-4 md:mt-0'>
            <Link
              to='/login'
              className='px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition text-center'
              onClick={() => setMenuOpen(false)}
            >
              Iniciar Sesión
            </Link>
            <Link
              to='/solicitar'
              className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center'
              onClick={() => setMenuOpen(false)}
            >
              Solicitar Crédito
            </Link>
          </div>
        </ul>
      </nav>
    </header>
  )
}

export default Header
