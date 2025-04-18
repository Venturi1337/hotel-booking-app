
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateClientDto {
  @IsOptional()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  address: string;

  @IsOptional()
  phone: string;
}
