
import { Injectable } from '@nestjs/common';
import { HotelRepositoryPort } from '../domain/ports/hotel.repository.port';
import { UpdateHotelDto } from '../http/dto/update-hotel.dto';

@Injectable()
export class UpdateHotelUseCase {
  constructor(private readonly hotelRepo: HotelRepositoryPort) {}

  async execute(id: string, hotelDto: UpdateHotelDto): Promise<any> {
    return await this.hotelRepo.update(id, hotelDto);
  }
}
