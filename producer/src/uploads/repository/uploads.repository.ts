import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { States, TRANSACTION_MODEL } from '../constants/constants';
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
  async getTransaction(idTransaction: string) {
    return this.transactionModel.findById({ id: idTransaction });
  }

  async update(idTransaction: string, state: States) {
    try {
      const updated = await this.transactionModel.findOneAndUpdate(
        { _id: idTransaction },
        { state: state },
        { new: true },
      );
      console.info('TRANSACTION UPDATE SUCCESFULLY', updated);
    } catch (error) {
      throw error;
    }
  }
}
