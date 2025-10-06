import { IsString, IsNumber } from 'class-validator'

export class RegisterTokenDto {
  @IsString()
  id: string

  @IsNumber()
  tokenVersion: number
}
