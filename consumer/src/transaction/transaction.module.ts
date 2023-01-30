import { Module, ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TransactionController } from './controller/transaction.controller';
import { databaseProviders } from './provider/database.provider';
import { DynamicProviders } from './provider/dynamic.provider';
import { transactionsProviders } from './provider/transaction.provider';
import { TransactionRepository } from './repository/transaction.repostiroy';
import { TransactionService } from './service/transaction.service';

export const TransactionModuleOptions: ModuleMetadata = {
  controllers: [TransactionController],
  providers: [
    TransactionService,
    TransactionRepository,
    ...databaseProviders,
    ...transactionsProviders,
    ...DynamicProviders,
  ],
  imports: [ConfigModule],
};

@Module(TransactionModuleOptions)
export class TransactionModule {}
