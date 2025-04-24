import { Body, Controller, Get, Param, Post, Put, HttpException, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Client } from '../domain/client.entity';
import { GetAllClientUseCase } from '../application/use-cases/get-all-client.use-case';
import { CreateClientUseCase } from '../application/use-cases/create-client.usecase';
import { UpdateClientUseCase } from '../application/use-cases/update-client.usecase';
import { GetOneClientUseCase } from '../application/use-cases/get-one-client.use-case';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { GlobalApiResponse } from '../../shared/http/response/api.response';

@ApiTags('clients')
@Controller('clients')
export class ClientController {
  constructor(
    private readonly getAllClient: GetAllClientUseCase,
    private readonly createClient: CreateClientUseCase,
    private readonly updateClient: UpdateClientUseCase,
    private readonly getOneClient: GetOneClientUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all clients' })
  @ApiResponse({ status: 200, description: 'List of clients retrieved successfully.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async getAll(): Promise<GlobalApiResponse> {
    const response = await this.getAllClient.execute();
    if (!response.success) {
      throw new HttpException(response.data.message, response.data.statusCode);
    }
    return response;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a client by ID' })
  @ApiResponse({ status: 200, description: 'Client retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Client not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async getOne(@Param('id') id: string): Promise<GlobalApiResponse> {
    const response = await this.getOneClient.execute(id);
    if (!response.success) {
      throw new HttpException(response.data.message, response.data.statusCode);
    }
    return response;
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({ status: 201, description: 'Client created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request. Invalid input data.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async create(@Body() body: CreateClientDto): Promise<GlobalApiResponse> {
    const response = await this.createClient.execute(body);
    if (!response.success) {
      throw new HttpException(response.data.message, response.data.statusCode);
    }
    return response;
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({ summary: 'Update an existing client' })
  @ApiResponse({ status: 200, description: 'Client updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request. Invalid input data.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async update(@Param('id') id: string, @Body() body: UpdateClientDto): Promise<GlobalApiResponse> {
    const response = await this.updateClient.execute(id, body);
    if (!response.success) {
      throw new HttpException(response.data.message, response.data.statusCode);
    }
    return response;
  }
}
