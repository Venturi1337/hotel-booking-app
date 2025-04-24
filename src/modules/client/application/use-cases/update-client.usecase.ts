import { Inject, Injectable } from '@nestjs/common';
import { ClientRepositoryPort } from '../../domain/ports/client.repository.port';
import { UpdateClientDto } from '../../http/dto/update-client.dto';
import { GlobalApiResponse } from 'src/modules/shared/http/response/api.response';

@Injectable()
export class UpdateClientUseCase {
  constructor(@Inject('ClientRepositoryPort') private readonly clientRepo: ClientRepositoryPort) {}

  async execute(id: string, updateClientDto: UpdateClientDto): Promise<GlobalApiResponse> {
    try {
      const client = await this.clientRepo.update(id, updateClientDto);
      return GlobalApiResponse.success({
        statusCode: 200,
        data: client,
        message: 'Client updated successfully',
      });
    } catch (error) {
      return GlobalApiResponse.error({
        statusCode: error.status,
        message: error.message,
      });
    }
  }
}
