import { Document } from 'mongoose';

export interface Transaction extends Document {
  readonly type: string;
  readonly state: string;
}
