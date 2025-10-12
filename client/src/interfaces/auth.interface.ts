import { type User } from './user.interface'

export interface LoginInput {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string,
  expires_in: number
  user: User
}

export interface RegisterInput {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface RegisterResponse extends User {
  access_token: string,
  user: User
}

export interface ValidateTokenResponse {
  new_access_token: string
  user: User
  expires_in: number
  valid: boolean
}

export interface ErrorResponse {
  statusCode: number
  message: string | string[]
  error: string
}
