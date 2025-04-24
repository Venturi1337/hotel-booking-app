import { Injectable, Inject } from '@nestjs/common';
import { Hotel } from '../domain/hotel.entity';
import { HotelRepositoryPort } from '../domain/ports/hotel.repository.port';
import { HotelFactory } from '../domain/hotel.factory';
import { CreateHotelDto } from '../http/dto/create-hotel.dto';
import { GlobalApiResponse } from '../../shared/http/response/api.response';

@Injectable()
export class CreateHotelUseCase {
  constructor(
    @Inject('HotelRepositoryPort') // Use the string token for injection
    private readonly hotelRepo: HotelRepositoryPort
  ) {}

  async execute(dto: CreateHotelDto): Promise<GlobalApiResponse> {
    const hotel = HotelFactory.create(dto);
    await this.hotelRepo.save(hotel);

    return GlobalApiResponse.success({
      message: 'Hotel created successfully',
      data: hotel,
    });
  }
}