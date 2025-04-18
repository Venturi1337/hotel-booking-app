import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HotelRepositoryPort } from '../../domain/ports/hotel.repository.port';
import { Hotel } from '../../domain/hotel.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MongoHotelRepository implements HotelRepositoryPort {
  constructor(@InjectModel('Hotel') private readonly hotelModel: Model<Hotel>) {}

  async findAll(): Promise<Hotel[]> {
    return this.hotelModel.find().lean();
  }

  async findById(id: string): Promise<Hotel | null> {
    return this.hotelModel.findOne({ _id: id }).lean();
  }

  async save(hotel: Hotel): Promise<Hotel> {
    const doc = new this.hotelModel(hotel);
    await doc.save();
    return hotel;
  }

  async update(id: string, hotel: Hotel): Promise<void> {
    await this.hotelModel.updateOne({ _id: id }, hotel);
  }
}
