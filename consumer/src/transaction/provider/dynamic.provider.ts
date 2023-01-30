import { Connection } from 'mongoose';
import { DATABASE_CONNECTION, DYNAMIC_MODEL } from '../constants/constants';
import { DynamicSchema } from '../schemas/dynamic.schema';

export const DynamicProviders = [
  {
    provide: DYNAMIC_MODEL,
    useFactory: (connection: Connection) =>
      connection.model('Dynamic', DynamicSchema),
    inject: [DATABASE_CONNECTION],
  },
];
