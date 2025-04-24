import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHotelBookingDto {
  @IsNotEmpty()
  @IsString()
  clientId: string;

  @IsNotEmpty()
  @IsString()
  hotelId: string;

  @IsNotEmpty() 
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}
