import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { UserRole } from 'src/shared/domain/enums/user-role.enum'
import { ROLES_KEY } from '../decorators/roles.decorator'
import { JwtPayloadGuardDto } from 'src/shared/domain/dto/jwt-payload-guard.dto'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1️⃣ Obtener los roles requeridos desde el decorador
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    )

    // 2️⃣ Si no se requieren roles, se permite el acceso
    if (!requiredRoles || requiredRoles.length === 0) return true

    // 3️⃣ Obtener el usuario desde el request
    const request = context.switchToHttp().getRequest<Request>()

    console.log('[RolesGuard] req.user:', request.user)
    console.log('[RolesGuard] required roles:', requiredRoles)
    const user = request.user as JwtPayloadGuardDto | undefined

    if (!user) {
      throw new ForbiddenException('User not authenticated')
    }

    // 4️⃣ Validar si el usuario tiene alguno de los roles requeridos
    const hasRole = requiredRoles.includes(user.role)
    if (!hasRole) {
      throw new ForbiddenException('Insufficient role permissions')
    }

    // 5️⃣ Autorizado ✅
    return true
  }
}
