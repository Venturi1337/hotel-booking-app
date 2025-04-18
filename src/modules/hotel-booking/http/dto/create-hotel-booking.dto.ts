import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHotelBookingDto {
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