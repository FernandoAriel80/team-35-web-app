import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '../decorators/roles.decorator'
import { UserRole } from 'src/shared/domain/enums/user-role.enum'
import { JwtPayloadDto } from 'src/shared/domain/dto/jwt-payload.dto'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    )
    if (!requiredRoles) return true

    const user = context.switchToHttp().getRequest<JwtPayloadDto>()

    if (!user) {
      throw new ForbiddenException('User not authenticated')
    }
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Insufficient role permissions')
    }

    return true
  }
}
