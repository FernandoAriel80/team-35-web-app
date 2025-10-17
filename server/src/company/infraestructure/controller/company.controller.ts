import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { CreateCompanyRequestDto } from 'src/company/domain/dto/create-company-request.dto'
import { CREATE_COMPANY_USECASE } from 'src/company/domain/usecase/create-company.usecase'
import type { CreateCompanyUseCase } from 'src/company/domain/usecase/create-company.usecase'
import type { GetAllCompanyByUserUseCase } from 'src/company/domain/usecase/get-all-company-by-user.usecase'
import { GET_ALL_COMPANY_BY_USER_USECASE } from 'src/company/domain/usecase/get-all-company-by-user.usecase'
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
  ) {}

  /* @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getAllCompanyByUser(@Param('id') id: string) {
    const userId = parseInt(id)
    return await this.getAllCompanyByUserUseCase.execute(userId)
  } */

  @Get('get-all-user-companies/')
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
}
