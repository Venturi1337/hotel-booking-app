import { Module, DynamicModule, Provider } from '@nestjs/common';
import { Hotel } from './domain/hotel.entity';
import { HotelRepositoryPort } from './domain/ports/hotel.repository.port';
import { Model } from 'mongoose';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../shared/shared.module';
import { CreateHotelUseCase } from './application/create-hotel.usecase';
import { UpdateHotelUseCase } from './application/update-hotel.usecase';
import { GetAllHotelUseCase } from './application/get-all-hotel.usecase';
import { ConfigService } from 'config/config.service';
import { FileStorageService } from '../shared/services/file-storage.service';
import { FSHotelRepository } from './infrastructure/fs/fs-hotel.repository';
import { HotelSchema } from './domain/mongo/hotel.schema';
import { HotelController } from './http/hotel.controller';
import { MongoHotelRepository } from './infrastructure/mongo/mongo-hotel-repository';
import { GetOneHotelUseCase } from './application/get-one-hotel.usecase';

@Module({})
export class HotelModule {
  static register(config: ConfigService): DynamicModule {
    const hotelRepositoryFactory = (
      fsService: FileStorageService,
      config: ConfigService,
      hotelModel?: Model<Hotel>,
    ): HotelRepositoryPort => {
      if (config.dataType === 'FS') {
        return new FSHotelRepository(config.fsFolder, fsService);
      }
      if (!hotelModel) {
        throw new Error('HotelModel is required in DB mode');
      }
      return new MongoHotelRepository(hotelModel as Model<Hotel>);
    };

    const useFactory = (
      fsService: FileStorageService,
      hotelModel?: Model<Hotel>,
    ) => {
      return hotelRepositoryFactory(fsService, config, hotelModel!);
    };

    const repoProvider: Provider = {
      provide: 'HotelRepository',
      useFactory,
      inject:
        config.dataType === 'FS'
          ? [FileStorageService]
          : [FileStorageService, getModelToken('Hotel')],
    };

    const mongoImports =
      config.dataType === 'DB'
        ? [
            MongooseModule.forFeature([
              { name: 'Hotel', schema: HotelSchema },
            ]),
          ]
        : [];

    return {
      module: HotelModule,
      imports: [...mongoImports, SharedModule],
      controllers: [HotelController],
      providers: [
        repoProvider,
        {
          provide: CreateHotelUseCase,
          useFactory: (repo: HotelRepositoryPort) =>
            new CreateHotelUseCase(repo),
          inject: ['HotelRepository'],
        },
        {
          provide: UpdateHotelUseCase,
          useFactory: (repo: HotelRepositoryPort) =>
            new UpdateHotelUseCase(repo),
          inject: ['HotelRepository'],
        },
        {
          provide: GetAllHotelUseCase,
          useFactory: (repo: HotelRepositoryPort) =>
            new GetAllHotelUseCase(repo),
          inject: ['HotelRepository'],
        },
        {
          provide: GetOneHotelUseCase,
          useFactory: (repo: HotelRepositoryPort) =>
            new GetOneHotelUseCase(repo),
          inject: ['HotelRepository'],
        },
      ],
      exports: [
        'HotelRepository',
        CreateHotelUseCase,
        UpdateHotelUseCase,
        GetAllHotelUseCase,
      ],
    };
  }
}
