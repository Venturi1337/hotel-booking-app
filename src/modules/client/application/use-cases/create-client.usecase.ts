import { Injectable } from '@nestjs/common';
import { Client } from '../../domain/client.entity';
import { ClientRepositoryPort } from '../../domain/ports/client.repository.port';
import { CreateClientDto } from '../../http/dto/create-client.dto';
import { ClientFactory } from '../../domain/client.factory';
@Injectable()
export class CreateClientUseCase {
  constructor(private readonly clientRepo: ClientRepositoryPort) {}

  async execute(createClientDto: CreateClientDto): Promise<Client> {
    const client = ClientFactory.create(
      createClientDto.name,
      createClientDto.address,
      createClientDto.phone,
    );
    
    await this.clientRepo.save(client);
    return client;
  }
}
