import { HotelBookingRepositoryPort } from '../../domain/ports/hotel-booking.repository.port';
import { GlobalApiResponse } from '../../../shared/http/response/api.response';
import { Inject } from '@nestjs/common';

export class GetAllHotelBookingUseCase {
  constructor(@Inject('HotelBookingRepository') private readonly repo: HotelBookingRepositoryPort) {}

  async execute(): Promise<GlobalApiResponse> {
    try {
      const bookings = await this.repo.findAll();
      return GlobalApiResponse.success({
        statusCode: 200,
        data: bookings,
        message: 'Hotel bookings retrieved successfully',
      });
    } catch (error) {
      return GlobalApiResponse.error({
        statusCode: error.status,
        message: error.message,
      });
    }
  }
}