import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientRepositoryPort } from '../../domain/ports/client.repository.port';
import { GlobalApiResponse } from '../../../shared/http/response/api.response';

@Injectable()
export class GetOneClientUseCase {
  constructor(
    @Inject('ClientRepositoryPort')
    private readonly clientRepo: ClientRepositoryPort,
  ) {}

  async execute(id: string): Promise<GlobalApiResponse> {
    try {
      const client = await this.clientRepo.findById(id);
      if (!client) {
        throw new NotFoundException(`Client with ID ${id} not found`);
      }
      return GlobalApiResponse.success({
        statusCode: 200,
        data: client,
        message: 'Client retrieved successfully',
      });
    } catch (error) {
      return GlobalApiResponse.error({
        statusCode: error.status,
        message: error.message,
      });
    }
  }
}
