import { UseGuards, applyDecorators } from '@nestjs/common'

import { UserRole } from 'src/shared/domain/enums/user-role.enum'
import { Roles } from './roles.decorator'
import { RolesGuard } from '../guards/roles.guard'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'

export function Auth(...roles: UserRole[]) {
  return applyDecorators(Roles(...roles), UseGuards(JwtAuthGuard, RolesGuard))
}
