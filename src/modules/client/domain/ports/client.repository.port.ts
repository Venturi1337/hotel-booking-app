import { Client } from "../client.entity";

export interface ClientRepositoryPort {
  findAll(): Promise<Client[]>;
  findById(id: string): Promise<Client | null>;
  save(client: Client): Promise<void>;
  update(_id: string, updateClientDto: any): Promise<void>;
}
