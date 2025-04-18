import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateHotelDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}
    