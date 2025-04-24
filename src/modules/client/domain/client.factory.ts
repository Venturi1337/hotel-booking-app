import { CreateClientDto } from '../http/dto/create-client.dto';
import { Client } from './client.entity';
import { v4 as uuidv4 } from 'uuid';

export class ClientFactory {
  static create(dto: CreateClientDto): Client {
    return new Client(uuidv4(), dto.name, dto.address, dto.phone, new Date());
  }
}

