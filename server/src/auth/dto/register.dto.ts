import { IsEmail, IsString, MinLength } from 'class-validator'
import { Transform } from 'class-transformer'

export class RegisterDto {
  /**
   * valida si es string, lo transforma a minúscula y quita espacios izquierda/derecha
   */
  @IsString()
  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  firstName: string

  /**
   * valida si es string, lo transforma a minúscula y quita espacios izquierda/derecha
   */
  @IsString()
  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  lastName: string

  /**
   * valida si es email, lo transforma a minúscula y quita espacios izquierda/derecha
   */
  @IsEmail()
  @Transform(({ value }: { value: string }) => value.toLowerCase().trim())
  email: string

  /**
   * valida si es string y como condicion un minimo de 8 caracteres
   */
  @IsString()
  @MinLength(8)
  password: string
}
