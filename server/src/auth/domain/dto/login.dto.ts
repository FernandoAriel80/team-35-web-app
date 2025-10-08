import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator'

export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Registered email address for account access',
    format: 'email',
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string

  @ApiProperty({
    example: 'SecurePassword123!',
    description: 'Account password for authentication',
    minLength: 6,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string
}
