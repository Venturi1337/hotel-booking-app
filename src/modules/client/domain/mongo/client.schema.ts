import { model, Schema } from 'mongoose';
import { Client } from '../client.entity';

export type ClientDocument = Client & Document;

export const ClientSchema = new Schema<Client>({
  _id: { type: String, required: true},
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  createdDate: { type: Date, required: true, default: Date.now },
});

export const ClientModel = model<Client>('Client', ClientSchema);
