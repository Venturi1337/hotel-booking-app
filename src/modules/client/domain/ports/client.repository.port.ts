import { UpdateClientDto } from "../../http/dto/update-client.dto";
import { Client } from "../client.entity";

export interface ClientRepositoryPort {
  findAll(): Promise<Client[]>;
  findById(id: string): Promise<Client | null>;
  save(client: Client): Promise<void>;
  update(_id: string, updateClientDto: UpdateClientDto): Promise<void>;
}
