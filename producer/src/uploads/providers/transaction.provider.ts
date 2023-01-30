import { Connection } from 'mongoose';
import { DATABASE_CONNECTION, TRANSACTION_MODEL } from '../constants/constants';
import { TransactionSchema } from '../schemas/transaction.schema';

export const transactionsProviders = [
  {
    provide: TRANSACTION_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Transaction', TransactionSchema),
    inject: [DATABASE_CONNECTION],
  },
];
