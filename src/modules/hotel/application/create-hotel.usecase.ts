
import { Injectable } from '@nestjs/common';
import { Hotel } from '../domain/hotel.entity';
import { HotelRepository } from '../domain/hotel.repository';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class CreateHotelUseCase {
  constructor(private readonly hotelRepo: HotelRepository) {}

  async execute(name: string, address: string): Promise<Hotel> {
    const id = uuidv4();
    const hotel = new Hotel(id, name, address, new Date());
    await this.hotelRepo.save(hotel);
    return hotel;
  }
}
