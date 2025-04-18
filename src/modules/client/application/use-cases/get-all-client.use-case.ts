import { Injectable } from '@nestjs/common';
import { ClientRepositoryPort } from '../../domain/ports/client.repository.port';
import { Client } from '../../domain/client.entity';

@Injectable()
export class GetAllClientUseCase {
  constructor(private readonly clientRepo: ClientRepositoryPort) {}

  async execute(): Promise<Client[]> {
    return await this.clientRepo.findAll();
  } 
}
