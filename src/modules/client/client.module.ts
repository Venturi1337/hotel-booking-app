import { Module, DynamicModule, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientController } from './http/client.controller';
import { FSClientRepository } from './infrastructure/fs/fs-client.repository';
import { MongoClientRepository } from './infrastructure/mongo/mongo-client.repository';
import { CreateClientUseCase } from './application/use-cases/create-client.usecase';
import { ClientSchema } from './domain/mongo/client.schema';
import { ConfigService } from '../../../config/config.service';
import { ClientRepositoryPort } from './domain/ports/client.repository.port';
import { UpdateClientUseCase } from './application/use-cases/update-client.usecase';
import { GetAllClientUseCase } from './application/use-cases/get-all-client.use-case';
import { SharedModule } from '../shared/shared.module';

@Module({})
export class ClientModule {
  static register(config: ConfigService): DynamicModule {
    const repoProvider: Provider = {
      provide: 'ClientRepository',
      useClass: config.dataType === 'FS'
        ? FSClientRepository
        : MongoClientRepository,
    };

    const mongoImports = config.dataType === 'DB'
      ? [MongooseModule.forFeature([{ name: 'Client', schema: ClientSchema }])]
      : [];

    return {
      module: ClientModule,
      imports: [
        ...mongoImports,
        SharedModule,
      ],
      controllers: [ClientController],
      providers: [
        repoProvider,
        {
          provide: CreateClientUseCase,
          useFactory: (repo: ClientRepositoryPort) => new CreateClientUseCase(repo),
          inject: ['ClientRepository'],
        },
        {
          provide: UpdateClientUseCase,
          useFactory: (repo: ClientRepositoryPort) => new UpdateClientUseCase(repo),
          inject: ['ClientRepository'],
        },
        {
          provide: GetAllClientUseCase,
          useFactory: (repo: ClientRepositoryPort) => new GetAllClientUseCase(repo),
          inject: ['ClientRepository'],
        },
      ],
      exports: [CreateClientUseCase, UpdateClientUseCase, GetAllClientUseCase],
    };
  }
}
