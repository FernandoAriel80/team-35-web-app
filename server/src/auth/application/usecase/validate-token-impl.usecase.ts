import { Inject, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { TokenValidationResultDto } from 'src/auth/domain/dto/token-validation-resultDto'
import type { TokenService } from 'src/auth/domain/service/token.service'
import { TOKEN_SERVICE } from 'src/auth/domain/service/token.service'

@Injectable()
export class ValidateTokenImplUseCase {
  constructor(
    @Inject(TOKEN_SERVICE)
    private readonly tokenService: TokenService,
  ) {}

  async execute(request: Request): Promise<TokenValidationResultDto> {
    const token = this.tokenService.extractToken(request)
    return this.tokenService.validateAndRenewToken(token)
  }
}
