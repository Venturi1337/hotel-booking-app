import { Body, Controller, Get, HttpException, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateHotelUseCase } from '../application/create-hotel.usecase';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { GetAllHotelUseCase } from '../application/get-all-hotel.usecase';
import { UpdateHotelUseCase } from '../application/update-hotel.usecase';
import { GetOneHotelUseCase } from '../application/get-one-hotel.usecase';
import { GlobalApiResponse } from '../../shared/http/response/api.response';

@ApiTags('hotels')
@Controller('hotels')
export class HotelController {
  constructor(
    private readonly getAllHotel: GetAllHotelUseCase,
    private readonly createHotel: CreateHotelUseCase,
    private readonly updateHotel: UpdateHotelUseCase,
    private readonly getOneHotel: GetOneHotelUseCase,
  ) {}
  @Get()
  @ApiOperation({ summary: 'Get all hotels' })
  @ApiResponse({ status: 200, description: 'Return all hotels.' })
  async getAll(): Promise<GlobalApiResponse> {
    try {
      const response = await this.getAllHotel.execute();
      if (!response.success) {
        throw new HttpException(response.data.message, response.data.statusCode);
      }
      return response;
    } catch (error) {
      console.log('error', error);
      throw new HttpException(error.message, 500);
    }

  }


  @Get(':id')
  @ApiOperation({ summary: 'Get a hotel by ID' })
  @ApiResponse({ status: 200, description: 'Return a hotel by ID.' })
  @ApiResponse({ status: 404, description: 'Hotel not found.' })
  async getOne(@Param('id') id: string): Promise<GlobalApiResponse> {
    const response = await this.getOneHotel.execute(id);
    if (!response.success) {
      throw new HttpException(response.data.message, response.data.statusCode);
    }
    return response;
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({ summary: 'Create a new hotel' })
  @ApiResponse({ status: 201, description: 'The hotel has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request. Invalid input data.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async create(@Body() body: CreateHotelDto): Promise<GlobalApiResponse> {
    const response = await this.createHotel.execute(body);
    if (!response.success) {
      throw new HttpException(response.data.message, response.data.statusCode);
    }
    return response;
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({ summary: 'Update a hotel by ID' })
  @ApiResponse({ status: 200, description: 'The hotel has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Hotel not found.' })
  @ApiResponse({ status: 400, description: 'Bad request. Invalid input data.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async update(@Param('id') id: string, @Body() body: UpdateHotelDto): Promise<GlobalApiResponse> {
    const response = await this.updateHotel.execute(id, body);
    if (!response.success) {
      throw new HttpException(response.data.message, response.data.statusCode);
    }
    return response;
  }
}
