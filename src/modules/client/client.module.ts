import { Module, DynamicModule, Provider } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { ClientController } from './http/client.controller';
import { FSClientRepository } from './infrastructure/fs/fs-client.repository';
import { MongoClientRepository } from './infrastructure/mongo/mongo-client.repository';
import { CreateClientUseCase } from './application/use-cases/create-client.usecase';
import { ClientDocument, ClientSchema } from './domain/mongo/client.schema';
import { ConfigService } from '../../../config/config.service';
import { ClientRepositoryPort } from './domain/ports/client.repository.port';
import { UpdateClientUseCase } from './application/use-cases/update-client.usecase';
import { GetAllClientUseCase } from './application/use-cases/get-all-client.use-case';
import { SharedModule } from '../shared/shared.module';
import { Client } from './domain/client.entity';
import { Model } from 'mongoose';
import { FileStorageService } from '../shared/services/file-storage.service';

@Module({})
export class ClientModule {
  static register(config: ConfigService): DynamicModule {
    const clientRepositoryFactory = (
      fsService: FileStorageService,
      config: ConfigService,
      clientModel?: Model<Client>,
    ): ClientRepositoryPort => {
      if (config.dataType === 'FS') {
        return new FSClientRepository(config.fsFolder, fsService);
      }
      if (!clientModel) {
        throw new Error('ClientModel is required in DB mode');
      }
      return new MongoClientRepository(clientModel as Model<ClientDocument>);
    };

    const useFactory = (
      fsService: FileStorageService,
      clientModel?: Model<Client>,
    ) => {
      return clientRepositoryFactory(fsService, config, clientModel!);
    };

    const repoProvider: Provider = {
      provide: 'ClientRepository',
      useFactory,
      inject:
        config.dataType === 'FS'
          ? [FileStorageService]
          : [FileStorageService, getModelToken('Client')],
    };

    const mongoImports =
      config.dataType === 'DB'
        ? [
            MongooseModule.forFeature([
              { name: 'Client', schema: ClientSchema },
            ]),
          ]
        : [];

    return {
      module: ClientModule,
      imports: [...mongoImports, SharedModule],
      controllers: [ClientController],
      providers: [
        repoProvider,
        {
          provide: CreateClientUseCase,
          useFactory: (repo: ClientRepositoryPort) =>
            new CreateClientUseCase(repo),
          inject: ['ClientRepository'],
        },
        {
          provide: UpdateClientUseCase,
          useFactory: (repo: ClientRepositoryPort) =>
            new UpdateClientUseCase(repo),
          inject: ['ClientRepository'],
        },
        {
          provide: GetAllClientUseCase,
          useFactory: (repo: ClientRepositoryPort) =>
            new GetAllClientUseCase(repo),
          inject: ['ClientRepository'],
        },
      ],
      exports: [CreateClientUseCase, UpdateClientUseCase, GetAllClientUseCase],
    };
  }
}
