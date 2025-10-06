import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(
      dto.firstName,
      dto.lastName,
      dto.email,
      dto.password,
    )
    return { status: 'ok', user }
  }
}
