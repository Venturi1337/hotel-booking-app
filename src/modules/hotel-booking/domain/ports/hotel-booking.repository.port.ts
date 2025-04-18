import { CreateHotelBookingDto } from '../../http/dto/create-hotel-booking.dto';
import { UpdateHotelBookingDto } from '../../http/dto/update-hotel-booking.dto';
import { HotelBooking } from '../hotel-booking.entity';

export interface HotelBookingRepositoryPort {
  findAll(): Promise<HotelBooking[]>;
  findById(id: string): Promise<HotelBooking | null>;
  save(dto: CreateHotelBookingDto): Promise<HotelBooking>;
  update(id: string, dto: UpdateHotelBookingDto): Promise<any>;
}
