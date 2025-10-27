import { Request } from 'express'

export interface RequestDto extends Request {
  user: {
    id: number
    email: string
    role: string
  }
}
