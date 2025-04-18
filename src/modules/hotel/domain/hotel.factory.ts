import { Hotel } from './hotel.entity';
import { v4 as uuidv4 } from 'uuid';

export class HotelFactory {
  static create(name: string, address: string): Hotel {
    return new Hotel(uuidv4(), name, address, new Date());
  }
}