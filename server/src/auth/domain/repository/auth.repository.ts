import { AuthDto } from '../dto/auth.dto'
import { CreateAuthDto } from '../dto/create-auth.dto'
//import { UpdateAuthDto } from '../dto/update-auth.dto'

export const AUTH_PG_REPOSITORY = 'AUTH_PG_REPOSITORY'

export interface AuthRepository {
  create(auth: CreateAuthDto): Promise<AuthDto>
  findByEmail(email: string): Promise<AuthDto | null>
  /* update(auth: UpdateAuthDto, id: string): Promise<AuthDto | null>
  findOne(authId: string): Promise<AuthDto | null>
  dalete(authId: string): Promise<AuthDto | null> */
}
