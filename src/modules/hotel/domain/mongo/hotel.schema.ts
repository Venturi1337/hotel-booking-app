import { Schema } from 'mongoose';
import { Hotel } from '../hotel.entity';

export type HotelDocument = Hotel & Document;

export const HotelSchema = new Schema<Hotel>({
  _id: { type: String, required: true},
  address: { type: String, required: true },
  createdDate: { type: Date, required: true }
});
