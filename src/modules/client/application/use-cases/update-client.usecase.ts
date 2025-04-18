import { Injectable } from '@nestjs/common';
import { ClientRepositoryPort } from '../../domain/ports/client.repository.port';
import { UpdateClientDto } from '../../http/dto/update-client.dto';

@Injectable()
export class UpdateClientUseCase {
  constructor(private readonly clientRepo: ClientRepositoryPort) {}

  async execute(id: string, updateClientDto: UpdateClientDto): Promise<void> {
    await this.clientRepo.update(id, updateClientDto);
  } 
}
