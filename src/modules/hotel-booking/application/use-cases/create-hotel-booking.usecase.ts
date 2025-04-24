import { Inject } from '@nestjs/common';
import { HotelBookingFactory } from '../../domain/hotel-booking.factory';
import { HotelBookingRepositoryPort } from '../../domain/ports/hotel-booking.repository.port';
import { CreateHotelBookingDto } from '../../http/dto/create-hotel-booking.dto';
import { GlobalApiResponse } from '../../../shared/http/response/api.response';

export class CreateHotelBookingUseCase {
  constructor(
    @Inject('HotelBookingRepositoryPort') private readonly repo: HotelBookingRepositoryPort,
  ) {}

  async execute(dto: CreateHotelBookingDto): Promise<GlobalApiResponse> {
    try {
      const booking = HotelBookingFactory.create(dto);
      const savedBooking = await this.repo.save(booking);

      return GlobalApiResponse.success({
        statusCode: 201,
        data: savedBooking,
        message: 'Hotel booking created successfully',
      });
    } catch (error) {
      console.log(error);
      return GlobalApiResponse.error({
        statusCode: error.status,
        message: error.message,
      });
    }
  }
}
