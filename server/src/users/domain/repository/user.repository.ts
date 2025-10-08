import { CreateUserDto } from '../dto/create-user.dto'
import { UserDto } from '../dto/user.dto'

export const USER_PG_REPOSITORY = 'USER_PG_REPOSITORY'

export interface UserRepository {
  create(createUserDto: CreateUserDto): Promise<UserDto>
  findByEmail(UserId: string): Promise<UserDto>
}
