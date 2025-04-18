
import { HotelBooking } from './hotel-booking.entity';

export interface HotelBookingRepository {
  findAll(): Promise<HotelBooking[]>;
  findById(id: number): Promise<HotelBooking | null>;
  save(booking: HotelBooking): Promise<void>;
  update(booking: HotelBooking): Promise<void>;
}
