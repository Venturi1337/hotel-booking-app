import { Inject, Injectable } from '@nestjs/common';
import { ClientRepositoryPort } from '../../domain/ports/client.repository.port';
import { Client } from '../../domain/client.entity';

@Injectable()
export class GetAllClientUseCase {
  constructor(@Inject('ClientRepositoryPort') private readonly clientRepo: ClientRepositoryPort) {}

  async execute(): Promise<Client[]> {
    return await this.clientRepo.findAll();
  } 
}
