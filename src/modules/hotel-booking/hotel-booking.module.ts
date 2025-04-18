import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from '../shared/shared.module';
import { HotelBookingController } from './http/hotel-booking.controller';
import { HotelBookingSchema } from './domain/mongo/hotel-booking.schema';
import { FSHotelBookingRepository } from './infrastructure/fs/fs-hotel-booking.repository';
import { MongoHotelBookingRepository } from './infrastructure/mongo/mongo-hotel-booking.repository';
import { FileStorageService } from '../shared/services/file-storage.service';
import { CreateHotelBookingUseCase } from './application/use-cases/create-hotel-booking.usecase';
import { GetAllHotelBookingUseCase } from './application/use-cases/get-all-hotel-booking.usecase';
import { UpdateHotelBookingUseCase } from './application/use-cases/update-hotel-booking.usecase';
import { GetOneHotelUseCase } from '../hotel/application/get-one-hotel.usecase';
import { HotelModule } from '../hotel/hotel.module';
import { HotelRepositoryPort } from '../hotel/domain/ports/hotel.repository.port';
import { GetOneClientUseCase } from '../client/application/use-cases/get-one-client.use-case';
import { ClientRepositoryPort } from '../client/domain/ports/client.repository.port';
import { ClientModule } from '../client/client.module';
import { ValidateClientHotelMiddleware } from './http/middlewares/validate-client-hotel.middleware';
import { ConfigService } from '../shared/services/config.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'HotelBooking', schema: HotelBookingSchema }]),
    SharedModule,
    ClientModule,
    HotelModule,
  ],
  controllers: [HotelBookingController],
  providers: [
    ValidateClientHotelMiddleware,
    ConfigService,
    {
      provide: 'HotelBookingRepository',
      useFactory: (configService: ConfigService, fsService: FileStorageService, mongoRepo: MongoHotelBookingRepository) => {
        const dataType = configService.dataType;
        return dataType === 'FS' ? new FSHotelBookingRepository(configService.fsFolder, fsService) : mongoRepo;
      },
      inject: [ConfigService, FileStorageService, MongoHotelBookingRepository],
    },
    {
      provide: 'HotelBookingRepositoryPort',
      useExisting: 'HotelBookingRepository',
    },
    MongoHotelBookingRepository,
    CreateHotelBookingUseCase,
    GetAllHotelBookingUseCase,
    UpdateHotelBookingUseCase,
    {
      provide: GetOneClientUseCase,
      useFactory: (clientRepo: ClientRepositoryPort) => new GetOneClientUseCase(clientRepo),
      inject: ['ClientRepository'],
    },
    {
      provide: GetOneHotelUseCase,
      useFactory: (hotelRepo: HotelRepositoryPort) => new GetOneHotelUseCase(hotelRepo),
      inject: ['HotelRepository'],
    },
  ],
  exports: [
    'HotelBookingRepository',
    'HotelBookingRepositoryPort',
    CreateHotelBookingUseCase,
    GetAllHotelBookingUseCase,
    UpdateHotelBookingUseCase,
    GetOneHotelUseCase,
  ],
})
export class HotelBookingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateClientHotelMiddleware)
      .forRoutes({
        path: 'hotel-bookings',
        method: RequestMethod.POST,
      });
  }
}