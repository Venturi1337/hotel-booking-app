import { IsOptional, IsString } from 'class-validator';

export class UpdateHotelBookingDto {
  @IsOptional()
  @IsString()
  clientId: string;

  @IsOptional()
  @IsString()
  hotelId: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  address: string;
}
