import { IsString, IsNumber } from 'class-validator'

export class RegisterTokenDto {
  @IsString()
  id: number

  @IsNumber()
  tokenVersion: number
}
