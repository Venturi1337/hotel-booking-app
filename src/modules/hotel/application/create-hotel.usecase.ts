
import { Injectable } from '@nestjs/common';
import { Hotel } from '../domain/hotel.entity';
import { HotelRepositoryPort } from '../domain/ports/hotel.repository.port';
import { v4 as uuidv4 } from 'uuid';
import { HotelFactory } from '../domain/hotel.factory';
@Injectable()
export class CreateHotelUseCase {
  constructor(private readonly hotelRepo: HotelRepositoryPort) {}

  async execute(name: string, address: string): Promise<Hotel> {
    const hotel = HotelFactory.create(name, address);
    await this.hotelRepo.save(hotel);
    return hotel;
  }
}
