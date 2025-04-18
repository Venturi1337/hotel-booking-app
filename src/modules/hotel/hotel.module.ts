import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../shared/shared.module';
import { HotelController } from './http/hotel.controller';
import { HotelSchema } from './domain/mongo/hotel.schema';
import { FSHotelRepository } from './infrastructure/fs/fs-hotel.repository';
import { MongoHotelRepository } from './infrastructure/mongo/mongo-hotel-repository';
import { ConfigService } from 'config/config.service';
import { FileStorageService } from '../shared/services/file-storage.service';
import { GetOneHotelUseCase } from './application/get-one-hotel.usecase';
import { GetAllHotelUseCase } from './application/get-all-hotel.usecase';
import { CreateHotelUseCase } from './application/create-hotel.usecase';
import { UpdateHotelUseCase } from './application/update-hotel.usecase';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Hotel', schema: HotelSchema }]),
    SharedModule,
  ],
  controllers: [HotelController],
  providers: [
    ConfigService,
    {
      provide: 'HotelRepository',
      useFactory: (configService: ConfigService, fsService: FileStorageService, mongoRepo: MongoHotelRepository) => {
        const dataType = configService.dataType;
        return dataType === 'FS' ? new FSHotelRepository(configService.fsFolder, fsService) : mongoRepo;
      },
      inject: [ConfigService, FileStorageService, MongoHotelRepository],
    },
    {
      provide: 'HotelRepositoryPort',
      useExisting: 'HotelRepository',
    },
    MongoHotelRepository,
    CreateHotelUseCase,
    UpdateHotelUseCase,
    GetAllHotelUseCase,
    GetOneHotelUseCase,
  ],
  exports: [
    'HotelRepository',
    'HotelRepositoryPort',
    CreateHotelUseCase,
    UpdateHotelUseCase,
    GetAllHotelUseCase,
    GetOneHotelUseCase,
  ],
})
export class HotelModule {}