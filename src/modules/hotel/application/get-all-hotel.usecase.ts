
import { Inject, Injectable } from '@nestjs/common';
import { Hotel } from '../domain/hotel.entity';
import { HotelRepositoryPort } from '../domain/ports/hotel.repository.port';
import { GlobalApiResponse } from '../../shared/http/response/api.response';

@Injectable()
export class GetAllHotelUseCase {
  constructor(@Inject('HotelRepositoryPort')  private readonly hotelRepo: HotelRepositoryPort) {}

  async execute(): Promise<GlobalApiResponse> {
    const hotels = await this.hotelRepo.findAll();
    return GlobalApiResponse.success({
      message: 'Hotels fetched successfully',
      data: hotels,
    });
  }
}
