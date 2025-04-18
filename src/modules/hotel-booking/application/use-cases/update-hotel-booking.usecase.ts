import { GlobalApiResponse } from '../../../shared/http/response/api.response';
import { HotelBookingRepositoryPort } from '../../domain/ports/hotel-booking.repository.port';
import { UpdateHotelBookingDto } from '../../http/dto/update-hotel-booking.dto';
import { Inject } from '@nestjs/common';

export class UpdateHotelBookingUseCase {
  constructor(@Inject('HotelBookingRepository') private readonly repo: HotelBookingRepositoryPort) {}

  async execute(id: string, dto: UpdateHotelBookingDto): Promise<GlobalApiResponse> {
    try {
      const existing = await this.repo.findById(id);
      if (!existing) throw new Error('Booking not found');
      await this.repo.update(id, dto);
      return GlobalApiResponse.success({
        statusCode: 200,
        data: null,
        message: 'Booking updated successfully',
      });
    } catch (error) {
      return GlobalApiResponse.error({
        statusCode: error.status,
        message: error.message,
      });
    }
  }
}