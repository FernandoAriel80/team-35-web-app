import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { CreateCompanyRequestDto } from 'src/company/domain/dto/create-company-request.dto'
import { UpdateCompanyRequestDto } from 'src/company/domain/dto/update-company-request.dto'
import { CREATE_COMPANY_USECASE } from 'src/company/domain/usecase/create-company.usecase'
import type { CreateCompanyUseCase } from 'src/company/domain/usecase/create-company.usecase'
import type { DeleteCompanyUseCase } from 'src/company/domain/usecase/delete-company.usecase'
import { DELETE_COMPANY_USECASE } from 'src/company/domain/usecase/delete-company.usecase'
import type { GetAllCompanyByUserUseCase } from 'src/company/domain/usecase/get-all-company-by-user.usecase'
import { GET_ALL_COMPANY_BY_USER_USECASE } from 'src/company/domain/usecase/get-all-company-by-user.usecase'
import type { GetAllCompanyUseCase } from 'src/company/domain/usecase/get-all-company.usecase'
import { GET_ALL_COMPANY_USECASE } from 'src/company/domain/usecase/get-all-company.usecase'
import type { UpdateCompanyUseCase } from 'src/company/domain/usecase/update-company.usecase'
import { UPDATE_COMPANY_USECASE } from 'src/company/domain/usecase/update-company.usecase'
/* import { UserRole } from 'src/shared/domain/enums/user-role.enum'
import { Roles } from 'src/shared/infraestructure/decorators/roles.decorator'
import { RolesGuard } from 'src/shared/infraestructure/guards/roles.guard' */
import { User } from 'src/shared/infraestructure/decorators/user.decorator'
import { JwtAuthGuard } from 'src/shared/infraestructure/guards/jwt-auth.guard'

@ApiTags('Company')
@ApiBearerAuth()
@Controller('company')
export class CompanyController {
  constructor(
    @Inject(CREATE_COMPANY_USECASE)
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    @Inject(GET_ALL_COMPANY_BY_USER_USECASE)
    private readonly getAllCompanyByUserUseCase: GetAllCompanyByUserUseCase,
    @Inject(UPDATE_COMPANY_USECASE)
    private readonly updateCompanyUseCase: UpdateCompanyUseCase,
    @Inject(DELETE_COMPANY_USECASE)
    private readonly deleteCompanyUseCase: DeleteCompanyUseCase,
    @Inject(GET_ALL_COMPANY_USECASE)
    private readonly getAllCompanyUseCase: GetAllCompanyUseCase,
  ) {}

  /* @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getAllCompanyByUser(@Param('id') id: string) {
    const userId = parseInt(id)
    return await this.getAllCompanyByUserUseCase.execute(userId)
  } */

  @Get('get-all-user-companies')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtiene las pymes del usuario que lo consulta.' })
  async getAllCompanyByUser(@User('id') userId: number) {
    return await this.getAllCompanyByUserUseCase.execute(userId)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Crea una nueva compañía' })
  @ApiBody({ type: CreateCompanyRequestDto })
  @ApiResponse({
    status: 201,
    description: 'Compañía creada exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o faltantes',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado — JWT inválido o ausente',
  })
  async createCompany(
    @User('id') userId: number,
    @Body() companyRequest: CreateCompanyRequestDto,
  ) {
    return await this.createCompanyUseCase.execute(userId, companyRequest)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Actualizar una compañía' })
  @ApiBody({ type: UpdateCompanyRequestDto })
  @ApiResponse({
    status: 201,
    description: 'Compañía actualizada exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o faltantes',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado — JWT inválido o ausente',
  })
  async updateCompany(
    @Param('id') id: string,
    @User('id') userId: number,
    @Body() companyRequest: UpdateCompanyRequestDto,
  ) {
    const companyId = parseInt(id)
    return this.updateCompanyUseCase.execute(companyId, userId, companyRequest)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Eliminar una compañía' })
  @ApiResponse({
    status: 401,
    description: 'No autorizado — JWT inválido o ausente',
  })
  async deleteCompany(@Param('id') id: string) {
    const companyId = parseInt(id)
    return this.deleteCompanyUseCase.execute(companyId)
  }

  /*   @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Obtener todas las compañías' })
  async getCompanies() {
    return await this.getAllCompanyUseCase.execute()
  } */
}
