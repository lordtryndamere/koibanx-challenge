import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { TRANSACTION_MODEL } from '../constants/constants';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { Transaction } from '../interfaces/transaction.interface';
import { UploadsRepository } from '../interfaces/uploads.repository.interface';

@Injectable()
export class UploadsRepositoryImpl implements UploadsRepository {
  constructor(
    @Inject(TRANSACTION_MODEL)
    private transactionModel: Model<Transaction>,
  ) {}

  async save(CreateTransactionDTO: CreateTransactionDto): Promise<string> {
    const createTransaction = new this.transactionModel(CreateTransactionDTO);
    const record = createTransaction.save();
    return (await record)._id;
  }
}
