import { Inject, Injectable } from '@nestjs/common';
import { ClientRepositoryPort } from '../../domain/ports/client.repository.port';
import { GlobalApiResponse } from 'src/modules/shared/http/response/api.response';

@Injectable()
export class GetAllClientUseCase {
  constructor(@Inject('ClientRepositoryPort') private readonly clientRepo: ClientRepositoryPort) {}

  async execute(): Promise<GlobalApiResponse> {
    try {
      const clients = await this.clientRepo.findAll();
      return GlobalApiResponse.success({
        statusCode: 200,
        data: clients,
        message: 'Clients retrieved successfully',
    });
  } catch (error) {
    return GlobalApiResponse.error({
      statusCode: error.status,
        message: error.message,
      });
    } 
  }
}
