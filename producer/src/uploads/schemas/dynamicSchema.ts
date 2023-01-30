import { Schema } from 'mongoose';

export const createDynamicSchema = (fields: object) => {
  const dynamicSchema = new Schema({ idTransaction: String, ...fields });
  return dynamicSchema;
};
