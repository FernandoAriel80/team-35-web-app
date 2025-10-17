import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common'
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
import { User } from 'src/shared/infraestructure/decorators/user.decorator'
import { JwtAuthGuard } from 'src/shared/infraestructure/guards/jwt-auth.guard'

@ApiTags('Company')
@ApiBearerAuth()
@Controller('company')
export class CompanyController {
  constructor(
    @Inject(CREATE_COMPANY_USECASE)
    private readonly createCompanyUseCase: CreateCompanyUseCase,
  ) {}

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
