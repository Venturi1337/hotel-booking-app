import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Client } from '../domain/client.entity';
import { GetAllClientUseCase } from '../application/use-cases/get-all-client.use-case';
import { CreateClientUseCase } from '../application/use-cases/create-client.usecase';
import { UpdateClientUseCase } from '../application/use-cases/update-client.usecase';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@ApiTags('clients')
@Controller('clients')
export class ClientController {
  constructor(
    private readonly getAllClient: GetAllClientUseCase,
    private readonly createClient: CreateClientUseCase,
    private readonly updateClient: UpdateClientUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all clients' })
  @ApiResponse({ status: 200, description: 'List of clients retrieved successfully.' })
  async getAll(): Promise<Client[]> {
    return await this.getAllClient.execute();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new client' })
  @ApiResponse({ status: 201, description: 'Client created successfully.' })
  async create(@Body() body: CreateClientDto) {
    return await this.createClient.execute(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing client' })
  @ApiResponse({ status: 200, description: 'Client updated successfully.' })
  async update(@Param('id') id: string, @Body() body: UpdateClientDto) {
    return await this.updateClient.execute(id, body);
  }
}
