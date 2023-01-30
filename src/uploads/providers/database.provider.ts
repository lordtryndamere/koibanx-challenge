import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from '../constants/constants';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://backend:Madara*123@cluster0.f4o6lo5.mongodb.net/?retryWrites=true&w=majority',
      ),
  },
];
