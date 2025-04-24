import { Inject, Injectable } from '@nestjs/common';
import { Client } from '../../domain/client.entity';
import { ClientRepositoryPort } from '../../domain/ports/client.repository.port';
import { CreateClientDto } from '../../http/dto/create-client.dto';
import { ClientFactory } from '../../domain/client.factory';
import { GlobalApiResponse } from 'src/modules/shared/http/response/api.response';
@Injectable()
export class CreateClientUseCase {
  constructor(@Inject('ClientRepositoryPort') private readonly clientRepo: ClientRepositoryPort) {}

  async   execute(createClientDto: CreateClientDto): Promise<GlobalApiResponse> {
    try {
      const client = ClientFactory.create(createClientDto);

      await this.clientRepo.save(client);
      return GlobalApiResponse.success({
        statusCode: 201,
        data: client,
        message: 'Client created successfully',
      });
    } catch (error) {
      return GlobalApiResponse.error({
        statusCode: error.status,
        message: error.message,
      });
    }
  }
}
