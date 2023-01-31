import { IsNumber, IsString } from 'class-validator';

export class ResponseEventDto {
  @IsNumber()
  code: number;
  @IsString()
  message: string;
  @IsString()
  idTransaction: string;
}
