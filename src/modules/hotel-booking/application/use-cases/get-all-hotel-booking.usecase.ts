import { HotelBookingRepositoryPort } from '../../domain/ports/hotel-booking.repository.port';
import { HotelBooking } from '../../domain/hotel-booking.entity';

export class GetAllHotelBookingUseCase {
  constructor(private readonly repo: HotelBookingRepositoryPort) {}

  async execute(): Promise<HotelBooking[]> {
    return this.repo.findAll();
  }
}