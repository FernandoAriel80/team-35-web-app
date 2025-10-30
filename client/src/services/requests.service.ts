import type { ErrorResponse } from "../interfaces/auth.interface"


const URL = import.meta.env.VITE_BASE_URL
const PORT = import.meta.env.VITE_PORT
const API_URL = import.meta.env.VITE_API_URL

const BASE_URL = API_URL || URL + PORT

export const getRequestsByUserId = async (
  token: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/credit-application/get-credit-appl-by-user`, {
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
  }
}

export const createRequest = async (
  token: string,
  data: unknown
) => {

  try {
    const response = await fetch(`${BASE_URL}/credit-application/upload-documents`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: data as unknown as BodyInit
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

export const getAllRequests = async (
  token: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/`, {
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
  }
}