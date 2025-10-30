import type { Company, NewCompany } from '../interfaces'
import type { ErrorResponse } from '../interfaces/auth.interface'

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const getCompaniesByUser = async (token: string) => {
  try {
    const response = await fetch(`${VITE_BACKEND_URL}/company/get-all-user-companies`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error: ErrorResponse = await response.json()
      throw error
    }

    const result = await response.json()
    return result
  } catch (error) {
    handleError(error as ErrorResponse)
    return [] as Company[]
  }
}

export const createCompany = async (companyData: NewCompany, token: string) => {
  try {
    const response = await fetch(`${VITE_BACKEND_URL}/company`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(companyData),
    })

    if (!response.ok) {
      const error: ErrorResponse = await response.json()
      throw error
    }

    return response.json()
  } catch (error) {
    handleError(error as ErrorResponse)
  }
}

export const updateCompany = async (
  companyId: number,
  companyData: NewCompany,
  token: string
) => {
  try {
    const response = await fetch(`${VITE_BACKEND_URL}/company/${companyId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(companyData),
    })

    if (!response.ok) {
      const error: ErrorResponse = await response.json()
      throw error
    }

    return response.json()
  } catch (error) {
    handleError(error as ErrorResponse)
  }
}

export const deleteCompanyById = async (companyId: number, token: string) => {
  try {
    const response = await fetch(`${VITE_BACKEND_URL}/company/${companyId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error: ErrorResponse = await response.json()
      throw error
    }

    const result = await response.json()
    return result
  } catch (error) {
    handleError(error as ErrorResponse)
  }
}

const handleError = (error: ErrorResponse) => {
  const message = Array.isArray(error.message)
    ? error.message.join('\n\n')
    : (error.message ?? 'Unexpected error')

  throw new Error(message)
}
