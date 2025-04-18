import { UpdateHotelDto } from '../../http/dto/update-hotel.dto';
import { Hotel } from '../hotel.entity';

export interface HotelRepositoryPort {
  findAll(): Promise<Hotel[]>;
  findById(id: string): Promise<Hotel | null>;
  save(hotel: Hotel): Promise<Hotel>;
  update(id: string, hotelDto: UpdateHotelDto): Promise<void>;
}
