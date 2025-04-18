
import { Injectable } from '@nestjs/common';
import { Hotel } from '../domain/hotel.entity';
import { HotelRepositoryPort } from '../domain/ports/hotel.repository.port';

@Injectable()
export class GetAllHotelUseCase {
  constructor(private readonly hotelRepo: HotelRepositoryPort) {}

  async execute(): Promise<Hotel[]> {
    return await this.hotelRepo.findAll();
  }
}
