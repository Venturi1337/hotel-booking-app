
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Client } from '../../domain/client.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ClientRepositoryPort } from '../../domain/ports/client.repository.port';
import { ClientDocument } from '../../domain/mongo/client.schema';  

@Injectable()
export class MongoClientRepository implements ClientRepositoryPort {
  constructor(@InjectModel('Client') private clientModel: Model<ClientDocument>) {}

  async findAll(): Promise<Client[]> {
    return this.clientModel.find().lean().exec();
  }

  async findById(id: string): Promise<Client | null> {
    return this.clientModel.findOne({ _id: id }).lean().exec();
  }

  async save(client: Client): Promise<void> {
    const doc = new this.clientModel(client);
    await doc.save();
  }

  async update(_id: string, updateClientDto: any): Promise<void> {
    await this.clientModel.updateOne({ _id }, { $set: updateClientDto }).exec();
  }
}
