import { UpdateHotelBookingDto } from '../../http/dto/update-hotel-booking.dto';
import { HotelBooking } from '../hotel-booking.entity';

export interface HotelBookingRepositoryPort {
  findAll(options?: any): Promise<HotelBooking[]>;
  findById(id: string): Promise<HotelBooking | null>;
  save(booking: HotelBooking): Promise<HotelBooking>;
  update(id: string, dto: UpdateHotelBookingDto): Promise<any>;
}
