import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { UserPayload } from 'src/shared/domain/dto/user-payload.dto'

export const User = createParamDecorator(
  (
    data: keyof UserPayload | undefined,
    ctx: ExecutionContext,
  ): UserPayload | UserPayload[keyof UserPayload] => {
    const request = ctx.switchToHttp().getRequest<Request>()
    const user = request.user as UserPayload

    if (data && user) {
      return user[data]
    }
    return user
  },
)
