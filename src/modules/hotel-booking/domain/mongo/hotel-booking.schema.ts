import { model, Schema } from 'mongoose';
import { HotelBooking } from '../hotel-booking.entity';

export type HotelBookingDocument = HotelBooking & Document;

export const HotelBookingSchema = new Schema<HotelBooking>({
  _id: { type: String, required: true },
  clientId: { type: String, required: true, ref: 'Client' },
  hotelId: { type: String, required: true, ref: 'Hotel' },
  name: { type: String, required: true },
  address: { type: String, required: true },
  createdDate: { type: Date, required: true }
});

export const HotelBookingModel = model<HotelBooking>('HotelBooking', HotelBookingSchema);