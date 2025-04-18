import { DynamicModule, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigService } from "./modules/shared/services/config.service";
import { ClientModule } from "./modules/client/client.module";
import { HotelModule } from "./modules/hotel/hotel.module";
import { HotelBookingModule } from "./modules/hotel-booking/hotel-booking.module";
import { SharedModule } from "./modules/shared/shared.module";
@Module({})
export class AppModule {
  static register(): DynamicModule {
    const config = new ConfigService();

    const imports: (DynamicModule | typeof SharedModule)[] = [
      SharedModule,
      HotelModule,
      ClientModule,
      HotelBookingModule,
    ];

    if (config.dataType === 'DB') {
      imports.unshift(MongooseModule.forRoot(config.mongoUri));
    }

    return {
      module: AppModule,
      imports,
    };
  }
}
