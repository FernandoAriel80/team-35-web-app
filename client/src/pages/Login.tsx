export const Login = () => {
  return (
    <section className="min-h-screen w-full text-slate-950 flex justify-center items-center">
      <form className="w-full max-w-[22rem] bg-slate-100 rounded-xl flex flex-col items-center p-8 border border-slate-200 shadow">
        <header className="text-center mb-6">
          <h1 className="font-bold text-2xl">Bienvenido a Financia</h1>
          <p className="text-xs text-slate-600">Ingresa a tu cuenta para continuar.</p>
        </header>

        <input required className="text-sm font-normal outline w-full rounded-t-sm bg-slate-200 outline-slate-300 px-2 py-1" type="email" placeholder="Correo electronico" />
        <input required className="text-sm font-normal outline w-full rounded-b-sm bg-slate-200 outline-slate-300 px-2 py-1" type="password" placeholder="Contrasena" />

        <footer className="flex flex-col justify-center mt-4 w-full gap-4">
          <a href="#" className="text-xs self-end text-[#1183d4] hover:text-[#0e6fb4]">Olvidaste tu contrasena?</a>

          <button className="bg-[#1183d4] hover:bg-[#0e6fb4] hover:cursor-pointer rounded-md py-1 text-white font-semibold" type="submit">Iniciar Sesion</button>

          <p className="text-xs text-center">No tienes una cuenta? <span className="text-[#1183d4] hover:text-[#0e6fb4] hover:cursor-pointer">Registrate</span></p>
        </footer>
      </form>
    </section>
  )
}