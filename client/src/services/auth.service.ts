import type { LoginInput, LoginResponse, RegisterInput, RegisterResponse, ValidateTokenResponse } from "../interfaces/auth.interface"

const BASE_URL = 'http://localhost:3000/auth'

export const registerService = async (data: RegisterInput): Promise<RegisterResponse> => {
  try {

    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) throw new Error(`Error: ${response.status}`)

    const result: RegisterResponse = await response.json()

    return result
  } catch (error) {
    throw new Error('Unexpected Error')
  }
}

export const loginService = async (data: LoginInput): Promise<LoginResponse> => {
  try {

    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) throw new Error(`Error: ${response.status}`)

    const result: LoginResponse = await response.json()

    return result
  } catch (error) {
    throw new Error('Unexpected Error')
  }

}
export const validateTokenService = async (token: string): Promise<ValidateTokenResponse> => {
  try {

    const response = await fetch(`${BASE_URL}/validate-token`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) throw new Error(`Error: ${response.status}`)

    const result: ValidateTokenResponse = await response.json()

    return result
  } catch (error) {
    throw new Error('Unexpected Error')
  }
}