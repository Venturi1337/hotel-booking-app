
import { Hotel } from './hotel.entity';

export interface HotelRepository {
  findAll(): Promise<Hotel[]>;
  findById(id: number): Promise<Hotel | null>;
  save(hotel: Hotel): Promise<void>;
  update(hotel: Hotel): Promise<void>;
}
