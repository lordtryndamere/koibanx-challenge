import { CreateTransactionDto } from '../dtos/create-transaction.dto';

export interface UploadsRepository {
  save(createTransactionDto: CreateTransactionDto): Promise<string>;
}
