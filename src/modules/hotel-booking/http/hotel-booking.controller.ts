import { Body, Controller, Get, Param, Post, Put, HttpException, UseGuards } from '@nestjs/common';
import { CreateHotelBookingUseCase } from '../application/use-cases/create-hotel-booking.usecase';
import { GetAllHotelBookingUseCase } from '../application/use-cases/get-all-hotel-booking.usecase';
import { UpdateHotelBookingUseCase } from '../application/use-cases/update-hotel-booking.usecase';
import { HotelBooking } from '../domain/hotel-booking.entity';
import { CreateHotelBookingDto } from './dto/create-hotel-booking.dto';
import { UpdateHotelBookingDto } from './dto/update-hotel-booking.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { GlobalApiResponse } from '../../shared/http/response/api.response';
import { ValidateClientHotelMiddleware } from './middlewares/validate-client-hotel.middleware';

@ApiTags('hotel-bookings')
@Controller('hotel-bookings')
export class HotelBookingController {
  constructor(
    private readonly create: CreateHotelBookingUseCase,
    private readonly getAll: GetAllHotelBookingUseCase,
    private readonly update: UpdateHotelBookingUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all hotel bookings' })
  @ApiResponse({ status: 200, description: 'Return all hotel bookings.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findAll(): Promise<GlobalApiResponse> {
    return this.getAll.execute();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new hotel booking' })
  @ApiBody({ type: CreateHotelBookingDto })
  @ApiResponse({ status: 201, description: 'The booking has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request. Invalid input data.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @UseGuards(ValidateClientHotelMiddleware)
  async createBooking(@Body() dto: CreateHotelBookingDto): Promise<GlobalApiResponse> {
    return this.create.execute(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing hotel booking' })
  @ApiParam({ name: 'id', description: 'The ID of the booking to update' })
  @ApiBody({ type: UpdateHotelBookingDto })
  @ApiResponse({ status: 200, description: 'The booking has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad request. Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Not found. Booking does not exist.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async updateBooking(@Param('id') id: string, @Body() dto: UpdateHotelBookingDto): Promise<GlobalApiResponse> {
    return this.update.execute(id, dto);
  }
}