
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateHotelUseCase } from '../application/create-hotel.usecase';
import { Hotel } from '../domain/hotel.entity';
import { FSHotelRepository } from '../infrastructure/fs/fs-hotel.repository';

@Controller('hotels')
export class HotelController {
  private readonly useCase = new CreateHotelUseCase(new FSHotelRepository());

  @Get()
  async getAll(): Promise<Hotel[]> {
    return await this.useCase['hotelRepo'].findAll();
  }

  @Post()
  async create(@Body() body: { name: string; address: string }): Promise<Hotel> {
    return await this.useCase.execute(body.name, body.address);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: { name: string; address: string }) {
    const hotel = new Hotel(id, body.name, body.address, new Date());
    await this.useCase['hotelRepo'].update(hotel);
    return hotel;
  }
}
