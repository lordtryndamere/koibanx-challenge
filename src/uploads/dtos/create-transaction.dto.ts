import { IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  type: string;

  @IsString()
  state: string;
}
