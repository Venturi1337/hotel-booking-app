import { HotelBookingFactory } from '../../domain/hotel-booking.factory';
import { HotelBookingRepositoryPort } from '../../domain/ports/hotel-booking.repository.port';
import { CreateHotelBookingDto } from '../../http/dto/create-hotel-booking.dto';
import { GetOneHotelUseCase } from '../../../hotel/application/get-one-hotel.usecase';

export class CreateHotelBookingUseCase {
  constructor(
    private readonly repo: HotelBookingRepositoryPort,
    private readonly getOneHotelUseCase: GetOneHotelUseCase
  ) {}

  async execute(dto: CreateHotelBookingDto) {
    const hotel = await this.getOneHotelUseCase.execute(dto.hotelId);
    if (!hotel) {
      throw new Error(`Hotel with ID ${dto.hotelId} not found`);
    }

    const booking = HotelBookingFactory.create(dto);
    return this.repo.save(booking);
  }
}