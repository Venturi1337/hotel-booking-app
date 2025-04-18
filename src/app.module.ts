import { DynamicModule, Module } from "@nestjs/common";
import { ConfigService } from "../config/config.service";
import { ClientModule } from "./modules/client/client.module";
import { HotelModule } from "./modules/hotel/hotel.module";
import { HotelBookingModule } from "./modules/hotel-booking/hotel-booking.module";
import { MongooseModule } from "@nestjs/mongoose";
import { SharedModule } from "./modules/shared/shared.module";

@Module({})
export class AppModule {
  static register(): DynamicModule {
    const config = new ConfigService();

    const imports = [
      SharedModule,
      ClientModule.register(config),
      // HotelModule.register(config),
      // HotelBookingModule.register(config),
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
