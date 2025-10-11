import { type User } from './user.interface'

export interface LoginResponse {
  access_tocken: string,
  expires_in: number
  user: User
}

export interface RegisterResponse extends User {
  access_tocken: string,
  user: User
}