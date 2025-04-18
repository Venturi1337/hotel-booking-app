import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateHotelBookingDto {
  @IsNotEmpty()
  @IsString()
  clientId: string;

  @IsNotEmpty()
  @IsString()
  hotelId: string;

  @IsOptional()
  startDate: Date;

  @IsOptional()
  endDate: Date;
}