import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Hotel } from '../domain/hotel.entity';
import { HotelRepositoryPort } from '../domain/ports/hotel.repository.port';
import { GlobalApiResponse } from '../../shared/http/response/api.response';
@Injectable()
export class GetOneHotelUseCase {
  constructor(@Inject('HotelRepositoryPort') private readonly hotelRepo: HotelRepositoryPort) {}

  async execute(hotelId: string): Promise<GlobalApiResponse> {
    try {
      const hotel = await this.hotelRepo.findById(hotelId);
      if (!hotel) {
        throw new NotFoundException(`Hotel with ID ${hotelId} not found`);
      }
      return GlobalApiResponse.success({
        statusCode: 200,
        data: hotel,
        message: 'Hotel retrieved successfully',
      });
    } catch (error) {
      return GlobalApiResponse.error({
        statusCode: error.status,
        message: error.message,
      });
    }
  }
}