import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator'

export class DataApplRequestDto {
  @IsNumber({}, { message: 'ID must be a number' })
  id: number

  @IsNotEmpty({ message: 'Amount is required' })
  @IsNumber({}, { message: 'Amount must be a number' })
  @IsPositive({ message: 'Amount must be positive' })
  amount: number
}
