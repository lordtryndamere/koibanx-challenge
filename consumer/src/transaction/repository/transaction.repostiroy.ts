import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  DYNAMIC_MODEL,
  States,
  TRANSACTION_MODEL,
} from '../constants/constants';

import { Transaction } from '../interfaces/transaction.interface';

@Injectable()
export class TransactionRepository {
  constructor(
    @Inject(TRANSACTION_MODEL)
    private transactionModel: Model<Transaction>,
    @Inject(DYNAMIC_MODEL)
    private dynamicModel: Model<any>,
  ) {}

  async bulkInsert(data: any[]) {
    try {
      await this.dynamicModel.insertMany(data);
    } catch (error) {
      throw error;
    }
  }
  async update(idTransaction: string, state: States) {
    try {
      const updated = await this.transactionModel.findOneAndUpdate(
        { id: idTransaction },
        { state: state },
        { new: true },
      );
      console.info('TRANSACTION UPDATE SUCCESFULLY', updated);
    } catch (error) {
      throw error;
    }
  }
}
