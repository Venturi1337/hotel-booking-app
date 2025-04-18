import { Client } from '../../domain/client.entity';
import { FileStorageService } from '../../../shared/services/file-storage.service';
import { ClientRepositoryPort } from '../../domain/ports/client.repository.port';

export class FSClientRepository implements ClientRepositoryPort {
  private readonly entity = 'Client';

  constructor(
    private readonly basePath: string,
    private readonly fsService: FileStorageService
  ) {
    this.fsService.ensureEntityFolder(this.basePath, this.entity);
  }

  async findAll(): Promise<Client[]> {
    return this.fsService.readAll<Client>(this.basePath, this.entity);
  }

  async findById(id: string): Promise<Client | null> {
    return this.fsService.readById<Client>(this.basePath, this.entity, id);
  }

  async save(client: Client): Promise<void> {
    await this.fsService.incrementMetadata(this.basePath, this.entity);
    await this.fsService.writeEntity(this.basePath, this.entity, client._id, client);
  }

  async update(_id: string, updateClientDto: any): Promise<void> {
    await this.fsService.updateById(this.basePath, this.entity, _id, updateClientDto);
  }
}
