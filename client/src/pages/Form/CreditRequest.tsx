import React, { useState } from 'react'

import { CreditRequestCompany } from '../../components/CreditRequestCompany'
import { CreditRequestFiles } from '../../components/CreditRequestFiles'
import { ProgressBar } from '../../components/ProgressBar'
import type { Company } from '../../interfaces'
import { createRequest } from '../../services/requests.service'
import { CreditOnboarding } from './CreditOnboarding'

interface Data {
  company: Company,
  amount: number
}

export const CreditRequest = () => {
  const [step, setStep] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(false)

  const formDataRef = React.useRef<FormData>(new FormData());

  const selectCompany = (data: Data) => {

    if (!data?.company) return

    formDataRef.current.append('companyId', data.company.id.toString())
    formDataRef.current.append('requestedAmount', data.amount.toString())

    setStep(2)
  }

  const selectFiles = (files: File[]) => {

    if (!files) return

    files.forEach(file => {
      formDataRef.current.append('files', file)
    })
  }

  const changeStep = (value: number) => {
    setStep(value)
  }

  const handleSubmit = async () => {
    const token = window.localStorage.getItem('token')

    if (!token) return

    setIsLoading(true)

    await createRequest(token, formDataRef.current)
      .then(() => {
        setStep(3)
      })
      .catch(() => alert('error al enviar solicitud'))
      .finally(() => setIsLoading(false))
  }

  const stepsComponent: Record<number, React.JSX.Element> = {
    1: <CreditRequestCompany onSelectCompany={selectCompany} />,
    2: <CreditRequestFiles onSelectFiles={selectFiles} onChangeStep={changeStep} onSubmit={handleSubmit} isLoading={isLoading} />,
    3: <CreditOnboarding />
  }

  return (
    <section className="flex flex-col gap-4 max-w-[40rem] mx-auto px-4 sm:px-0 w-full py-10">
      <ProgressBar value={step} maxValue={3} />

      {
        stepsComponent[step]
      }

    </section>
  )
}