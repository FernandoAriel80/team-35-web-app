import { IsString, IsNumber } from 'class-validator'

export class Payload {
  @IsString()
  sub: string

  @IsNumber()
  tokenVersion: number
}
