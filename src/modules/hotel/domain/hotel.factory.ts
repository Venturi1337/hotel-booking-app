import { Hotel } from './hotel.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateHotelDto } from '../http/dto/create-hotel.dto';

export class HotelFactory {
  static create(createHotelDto: CreateHotelDto): Hotel {
    const { name, address } = createHotelDto;
    return new Hotel(uuidv4(), name, address, new Date());
  }
}