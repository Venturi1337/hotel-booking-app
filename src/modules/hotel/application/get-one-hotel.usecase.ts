import { Injectable, NotFoundException } from '@nestjs/common';
import { Hotel } from '../domain/hotel.entity';
import { HotelRepositoryPort } from '../domain/ports/hotel.repository.port';

@Injectable()
export class GetOneHotelUseCase {
  constructor(private readonly hotelRepo: HotelRepositoryPort) {}

  async execute(hotelId: string): Promise<Hotel> {
    const hotel = await this.hotelRepo.findById(hotelId);
    if (!hotel) {
      throw new NotFoundException(`Hotel with ID ${hotelId} not found`);
    }
    return hotel;
  }
}