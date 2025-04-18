import { Client } from './client.entity';
import { v4 as uuidv4 } from 'uuid';

export class ClientFactory {
  static create(name: string, address: string, phone: string): Client {
    return new Client(uuidv4(), name, address, phone, new Date());
  }
}
