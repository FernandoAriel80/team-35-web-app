import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateCompanyRequestDto {
  id: number

  @ApiProperty({
    description: 'Nombre de la compañía',
    example: 'Tech Solutions S.A.',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: 'Tipo de compañía o rubro',
    example: 'Software',
  })
  @IsString()
  @IsNotEmpty()
  type: string

  @ApiProperty({
    description: 'Número de identificación fiscal (CUIT)',
    example: '30-12345678-9',
  })
  @IsString()
  @IsNotEmpty()
  taxId: string

  @ApiProperty({
    description: 'Fecha de inicio de actividades (ISO string o formato libre)',
    example: '2022-05-10',
  })
  @IsString()
  @IsNotEmpty()
  activity: string

  @ApiProperty({
    description: 'Cantidad de empleados',
    example: 50,
  })
  @IsNumber()
  @IsNotEmpty()
  employeeCount: number

  @ApiProperty({
    description: 'Dirección principal de la empresa',
    example: 'Av. Corrientes 1234, Buenos Aires, Argentina',
  })
  @IsString()
  @IsNotEmpty()
  address: string

  @ApiPropertyOptional({
    description: 'Sitio web de la empresa (opcional)',
    example: 'https://techsolutions.com',
  })
  @IsOptional()
  @IsString()
  website?: string

  @ApiProperty({
    description: 'Correo electrónico de contacto de la empresa',
    example: 'contacto@techsolutions.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string
}
