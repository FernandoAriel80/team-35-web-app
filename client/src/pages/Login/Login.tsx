import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { type LoginFormValues, invoiceSchema } from './login.schema'

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <section className='w-full flex  justify-center relative'>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(onSubmit)()
        }}
        className='w-full max-w-[22rem] h-fit my-20 bg-slate-100 rounded-xl flex flex-col items-center p-8 border border-slate-200 shadow'
      >
        <header className='text-center mb-6'>
          <h1 className='font-bold text-2xl'>Bienvenido a Financia</h1>
          <p className='text-xs text-slate-600'>
            Ingresa a tu cuenta para continuar.
          </p>
        </header>

        <input
          {...register('email')}
          required
          className='text-sm font-normal outline w-full rounded-t-sm bg-slate-200 outline-slate-300 p-2'
          type='email'
          placeholder='Correo electrónico'
        />
        <input
          maxLength={20}
          {...register('password')}
          required
          className='text-sm font-normal outline w-full rounded-b-sm bg-slate-200 outline-slate-300 p-2'
          type='password'
          placeholder='Contraseña'
        />

        {errors.email && (
          <p className='text-red-500 text-xs w-full pt-3'>
            {errors.email.message}
          </p>
        )}

        {errors.password && (
          <p className='text-red-500 text-xs w-full pt-3'>
            {errors.password.message}
          </p>
        )}

        <footer className='flex flex-col justify-center mt-4 w-full gap-4'>
          <a
            href='#'
            className='text-xs self-end text-[#1183d4] hover:text-[#0e6fb4]'
          >
            ¿Olvidaste tu contraseña?
          </a>

          <button
            className='bg-[#1183d4] hover:bg-[#0e6fb4] hover:cursor-pointer rounded-md py-1 text-white font-semibold'
            type='submit'
          >
            Iniciar Sesión
          </button>

          <p className='text-xs text-center'>
            ¿No tienes una cuenta?{' '}
            <span className='text-[#1183d4] hover:text-[#0e6fb4] hover:cursor-pointer'>
              Regístrate
            </span>
          </p>
        </footer>
      </form>
    </section>
  )
}
