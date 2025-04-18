import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Client } from '../domain/client.entity';
import { GetAllClientUseCase } from '../application/use-cases/get-all-client.use-case';
import { CreateClientUseCase } from '../application/use-cases/create-client.usecase';
import { UpdateClientUseCase } from '../application/use-cases/update-client.usecase';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientController {
  constructor(
    private readonly getAllClient: GetAllClientUseCase,
    private readonly createClient: CreateClientUseCase,
    private readonly updateClient: UpdateClientUseCase,
  ) {}

  @Get()
  async getAll(): Promise<Client[]> {
    return await this.getAllClient.execute();
  }

  @Post()
  async create(@Body() body: CreateClientDto) {
    return await this.createClient.execute(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateClientDto) {
    return await this.updateClient.execute(id, body);
  }
}
