import { Inject, Injectable } from '@nestjs/common';
import { States } from '../constants/constants';
import { ResponseEventDto } from '../events-dto/response-event.dto';

import { TransactionRepository } from '../repository/transaction.repostiroy';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(TransactionRepository)
    private readonly repository: TransactionRepository,
  ) {}
  async dataInChunks(data: Array<any>) {
    const chunkSize = Math.ceil(data.length / 2000);
    const chunk = [];
    for (let i = 0; i < data.length; i += 5000) {
      chunk.push(data.slice(i, i + 5000));
    }
    return chunk;
  }
  async handleTransaction(transaction: any) {
    const idTransaction = transaction.idTransaction;

    try {
      const task = JSON.parse(transaction.data);
      //updating state proccess
      await this.repository.update(idTransaction, States.PROCESSING);
      //filtering errors

      const success = task.data
        .map((object) => {
          object.idTransaction = transaction.idTransaction;
          const correct = [];
          const evaluate = Object.values(object);
          for (const value of evaluate) {
            if (typeof value != 'object') {
              correct.push(object);
            }
          }
          return correct;
        })
        .filter((el) => (Array.isArray(el) ? el.length : true))
        .flat(Infinity);

      const errors = task.data
        .map((object) => {
          object.idTransaction = transaction.idTransaction;
          const error = [];
          const evaluate = Object.values(object);
          for (const value of evaluate) {
            if (typeof value === 'object') {
              error.push(object);
            }
          }
          return error;
        })
        .filter((el) => (Array.isArray(el) ? el.length : true))
        .flat(Infinity);

      //saving data

      await this.repository.bulkInsert(success);
      await this.repository.bulkInsert(errors);

      console.info(
        'TransactionService.handleTransaction',
        'transaction with id: ' + idTransaction + ' was successfully',
      );
      return {
        code: 200,
        message: 'Transaction finished',
        idTransaction,
      } as ResponseEventDto;
    } catch (error) {
      throw error;
    }
  }
}
