import { Inject, Injectable } from '@nestjs/common';
import { ClientRepositoryPort } from '../../domain/ports/client.repository.port';
import { UpdateClientDto } from '../../http/dto/update-client.dto';

@Injectable()
export class UpdateClientUseCase {
  constructor(@Inject('ClientRepositoryPort') private readonly clientRepo: ClientRepositoryPort) {}

  async execute(id: string, updateClientDto: UpdateClientDto): Promise<any> {
    return await this.clientRepo.update(id, updateClientDto);
  } 
}
