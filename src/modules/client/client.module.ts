import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../shared/shared.module';
import { ClientController } from './http/client.controller';
import { ClientSchema } from './domain/mongo/client.schema';
import { FSClientRepository } from './infrastructure/fs/fs-client.repository';
import { MongoClientRepository } from './infrastructure/mongo/mongo-client.repository';
import { ConfigService } from '../shared/services/config.service';
import { FileStorageService } from '../shared/services/file-storage.service';
import { CreateClientUseCase } from './application/use-cases/create-client.usecase';
import { UpdateClientUseCase } from './application/use-cases/update-client.usecase';
import { GetAllClientUseCase } from './application/use-cases/get-all-client.use-case';
import { GetOneClientUseCase } from './application/use-cases/get-one-client.use-case';

@Module({
  imports: [
    SharedModule,
    ...((() => {
      const configService = new ConfigService();
      return configService.dataType !== 'FS' ? [MongooseModule.forFeature([{ name: 'Client', schema: ClientSchema }])] : [];
    })()),
  ],
  controllers: [ClientController],
  providers: [
    ConfigService,
    {
      provide: 'ClientRepository',
      useFactory: (configService: ConfigService, fsService: FileStorageService, mongoRepo?: MongoClientRepository) => {
        const dataType = configService.dataType;
        return dataType === 'FS' ? new FSClientRepository(configService.fsFolder, fsService) : mongoRepo!;
      },
      inject: [
        ConfigService, 
        FileStorageService, 
        ...(new ConfigService().dataType !== 'FS' ? [MongoClientRepository] : [])
      ],
    },
    {
      provide: 'ClientRepositoryPort',
      useExisting: 'ClientRepository',
    },
    ...((() => {
      const configService = new ConfigService();
      return configService.dataType !== 'FS' ? [MongoClientRepository] : [];
    })()),
    CreateClientUseCase,
    UpdateClientUseCase,
    GetAllClientUseCase,
    GetOneClientUseCase,
  ],
  exports: [
    'ClientRepository',
    'ClientRepositoryPort',
    CreateClientUseCase,
    UpdateClientUseCase,
    GetAllClientUseCase,
    GetOneClientUseCase,
  ],
})
export class ClientModule {}