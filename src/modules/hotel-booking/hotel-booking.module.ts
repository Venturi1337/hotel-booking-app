import { Module, DynamicModule, Provider } from "@nestjs/common";
import { MongooseModule, getModelToken } from "@nestjs/mongoose";
import { FileStorageService } from "../shared/services/file-storage.service";
import { ConfigService } from "config/config.service";
import { HotelBooking } from "./domain/hotel-booking.entity";
import { HotelBookingRepositoryPort } from "./domain/ports/hotel-booking.repository.port";
import { HotelBookingSchema } from "./domain/mongo/hotel-booking.schema";
import { HotelRepositoryPort } from "../hotel/domain/ports/hotel.repository.port";
import { Model } from "mongoose";
import { CreateHotelBookingUseCase } from "./application/use-cases/create-hotel-booking.usecase";
import { HotelBookingController } from "./http/hotel-booking.controller";
import { GetAllHotelBookingUseCase } from "./application/use-cases/get-all-hotel-booking.usecase";
import { UpdateHotelBookingUseCase } from "./application/use-cases/update-hotel-booking.usecase";
import { FSHotelBookingRepository } from "./infrastructure/fs/fs-hotel-booking.repository";
import { MongoHotelBookingRepository } from "./infrastructure/mongo/mongo-hotel-booking.repository";
import { SharedModule } from "../shared/shared.module";
import { GetOneHotelUseCase } from '../hotel/application/get-one-hotel.usecase';
import { HotelModule } from "../hotel/hotel.module";

@Module({})
export class HotelBookingModule {
  static register(config: ConfigService): DynamicModule {
    const hotelRepositoryFactory = (
      fsService: FileStorageService,
      config: ConfigService,
      hotelBookingModel?: Model<HotelBooking>,
    ): HotelBookingRepositoryPort => {
      if (config.dataType === 'FS') {
        return new FSHotelBookingRepository(config.fsFolder, fsService);
      }
      if (!hotelBookingModel) {
        throw new Error('HotelBookingModel is required in DB mode');
      }
      return new MongoHotelBookingRepository(hotelBookingModel as Model<HotelBooking>);
    };

    const useFactory = (
      fsService: FileStorageService,
      hotelBookingModel?: Model<HotelBooking>,
    ) => {
      return hotelRepositoryFactory(fsService, config, hotelBookingModel!);
    };

    const repoProvider: Provider = {
      provide: 'HotelBookingRepository',
      useFactory,
      inject:
        config.dataType === 'FS'
          ? [FileStorageService]
          : [FileStorageService, getModelToken('HotelBooking')],
    };

    const mongoImports = config.dataType === 'DB'
      ? [MongooseModule.forFeature([{ name: 'HotelBooking', schema: HotelBookingSchema }])]
      : [];

    return {
      module: HotelBookingModule,
      imports: [
        ...mongoImports,
        SharedModule,
        HotelModule.register(config),
      ],
      controllers: [HotelBookingController],
      providers: [
        repoProvider,
        {
          provide: CreateHotelBookingUseCase,
          useFactory: (
            repo: HotelBookingRepositoryPort,
            getOneHotelUseCase: GetOneHotelUseCase,
          ) => new CreateHotelBookingUseCase(repo, getOneHotelUseCase),
          inject: ['HotelBookingRepository', GetOneHotelUseCase],
        },
        {
          provide: GetAllHotelBookingUseCase,
          useFactory: (repo: HotelBookingRepositoryPort) =>
            new GetAllHotelBookingUseCase(repo),
          inject: ['HotelBookingRepository'],
        },
        {
          provide: UpdateHotelBookingUseCase,
          useFactory: (repo: HotelBookingRepositoryPort) =>
            new UpdateHotelBookingUseCase(repo),
          inject: ['HotelBookingRepository'],
        },
        {
          provide: GetOneHotelUseCase,
          useFactory: (hotelRepo: HotelRepositoryPort) =>
            new GetOneHotelUseCase(hotelRepo),
          inject: ['HotelRepository'],
        },
      ],
      exports: [
        'HotelBookingRepository',
        CreateHotelBookingUseCase,
        GetAllHotelBookingUseCase,
        UpdateHotelBookingUseCase,
        GetOneHotelUseCase,
      ],
    };
  }
}
