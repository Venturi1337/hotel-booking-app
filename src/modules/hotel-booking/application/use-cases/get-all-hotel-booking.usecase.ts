import { HotelBookingRepositoryPort } from '../../domain/ports/hotel-booking.repository.port';
import { HotelBooking } from '../../domain/hotel-booking.entity';
import { GlobalApiResponse } from 'src/api/response';

export class GetAllHotelBookingUseCase {
  constructor(private readonly repo: HotelBookingRepositoryPort) {}

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