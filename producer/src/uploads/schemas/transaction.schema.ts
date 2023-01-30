import * as mongoose from 'mongoose';

export const TransactionSchema = new mongoose.Schema({
  type: String,
  state: String,
});
