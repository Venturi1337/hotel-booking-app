import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateHotelUseCase } from '../application/create-hotel.usecase';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { GetAllHotelUseCase } from '../application/get-all-hotel.usecase';
import { UpdateHotelUseCase } from '../application/update-hotel.usecase';
import { GetOneHotelUseCase } from '../application/get-one-hotel.usecase';
import { GlobalApiResponse } from 'src/api/response';

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
    return await this.getAllHotel.execute();
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get a hotel by ID' })
  @ApiResponse({ status: 200, description: 'Return a hotel by ID.' })
  @ApiResponse({ status: 404, description: 'Hotel not found.' })
  async getOne(@Param('id') id: string): Promise<GlobalApiResponse> {
    return await this.getOneHotel.execute(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new hotel' })
  @ApiResponse({ status: 201, description: 'The hotel has been successfully created.' })
  async create(@Body() body: CreateHotelDto): Promise<GlobalApiResponse> {
    return await this.createHotel.execute(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a hotel by ID' })
  @ApiResponse({ status: 200, description: 'The hotel has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Hotel not found.' })
  async update(@Param('id') id: string, @Body() body: UpdateHotelDto) {
    await this.updateHotel.execute(id, body);
  }
}
