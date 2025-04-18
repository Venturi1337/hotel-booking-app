
import { Inject, Injectable } from '@nestjs/common';
import { HotelRepositoryPort } from '../domain/ports/hotel.repository.port';
import { UpdateHotelDto } from '../http/dto/update-hotel.dto';
import { GlobalApiResponse } from '../../shared/http/response/api.response';

@Injectable()
export class UpdateHotelUseCase {
  constructor(@Inject('HotelRepositoryPort') private readonly hotelRepo: HotelRepositoryPort) {}

  async execute(id: string, hotelDto: UpdateHotelDto): Promise<GlobalApiResponse> {
    await this.hotelRepo.update(id, hotelDto);
    return GlobalApiResponse.success({
      message: 'Hotel updated successfully',
      data: hotelDto,
    });
  }
}
