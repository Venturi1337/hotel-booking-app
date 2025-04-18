import { v4 as uuidv4 } from 'uuid';
import { HotelBooking } from './hotel-booking.entity';
import { CreateHotelBookingDto } from '../http/dto/create-hotel-booking.dto';

export class HotelBookingFactory {
  static create(createHotelBookingDto: CreateHotelBookingDto): HotelBooking {
    const { clientId, hotelId, startDate, endDate } = createHotelBookingDto;
    return new HotelBooking(uuidv4(), clientId, hotelId, startDate, endDate, new Date());
  }
}