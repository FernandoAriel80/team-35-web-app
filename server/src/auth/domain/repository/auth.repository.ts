import { AuthDto } from '../dto/auth.dto'
import { UserCreateValidatedDto } from '../dto/user-create-validated.dto'
//import { UpdateAuthDto } from '../dto/update-auth.dto'

export const AUTH_PG_REPOSITORY = 'AUTH_PG_REPOSITORY'

export interface AuthRepository {
  create(auth: UserCreateValidatedDto): Promise<AuthDto>
  findByEmail(email: string): Promise<AuthDto | null>
  findOne(authId: number): Promise<AuthDto | null>
  /* update(auth: UpdateAuthDto, id: string): Promise<AuthDto | null>
  dalete(authId: string): Promise<AuthDto | null> */
}
