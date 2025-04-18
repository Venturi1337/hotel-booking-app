
import { Module } from '@nestjs/common';
import { FSHotelRepository } from './infrastructure/fs/fs-hotel.repository';
import { CreateHotelUseCase } from './application/create-hotel.usecase';
import { HotelController } from './http/hotel.controller';

@Module({
  controllers: [HotelController],
  providers: [FSHotelRepository, CreateHotelUseCase],
})
export class HotelModule {}
