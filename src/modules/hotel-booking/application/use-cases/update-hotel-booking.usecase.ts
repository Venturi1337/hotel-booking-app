import { GlobalApiResponse } from 'src/api/response';
import { HotelBooking } from '../../domain/hotel-booking.entity';
import { HotelBookingRepositoryPort } from '../../domain/ports/hotel-booking.repository.port';
import { UpdateHotelBookingDto } from '../../http/dto/update-hotel-booking.dto';

export class UpdateHotelBookingUseCase {
  constructor(private readonly repo: HotelBookingRepositoryPort) {}

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