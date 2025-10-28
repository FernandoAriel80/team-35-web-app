export const CreditOnboarding = () => {
  return (
    <div className="flex flex-col min-h-screen font-display bg-background-light text-foreground-light">
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Progreso de tu crédito</h2>
            <p className="mt-2 text-gray-600">
              Sigue cada etapa de tu solicitud y mantente informado en tiempo real.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-[11px] top-0 w-[3px] h-full bg-gray-300"></div>

            <div className="space-y-10">
              <div className="relative pl-10">
                <div className="absolute left-0 top-0 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white font-bold">✓</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Solicitud Recibida</h3>
                <p className="text-base text-gray-500 mt-1">
                  Hemos recibido tu solicitud y nuestro equipo está revisando la información inicial.
                </p>
              </div>

              <div className="relative pl-10">
                <div className="absolute left-0 top-0 size-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white font-bold">↻</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Análisis en Curso</h3>
                <p className="text-base text-gray-500 mt-1">
                  Evaluamos tus antecedentes financieros y verificamos los documentos proporcionados.
                </p>
              </div>

              <div className="relative pl-10">
                <div className="absolute left-0 top-0 w-6 h-6 bg-gray-400 rounded-full border-2 border-white flex items-center justify-center">
                </div>
                <h3 className="text-lg font-semibold text-gray-400">Aprobación Pendiente</h3>
                <p className="text-base text-gray-400 mt-1">
                  Tu solicitud está siendo evaluada para la aprobación final por nuestro equipo de crédito.
                </p>
              </div>

              <div className="relative pl-10">
                <div className="absolute left-0 top-0 w-6 h-6 bg-gray-400 rounded-full border-2 border-white flex items-center justify-center">
                </div>
                <h3 className="text-lg font-semibold text-gray-400">Crédito Desembolsado</h3>
                <p className="text-base text-gray-400 mt-1">
                  Una vez aprobado, los fondos serán transferidos a tu cuenta y podrás comenzar a utilizarlos.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};
