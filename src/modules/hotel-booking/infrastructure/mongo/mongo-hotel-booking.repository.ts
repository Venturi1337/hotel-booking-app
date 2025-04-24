import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HotelBooking } from '../../domain/hotel-booking.entity';
import { HotelBookingRepositoryPort } from '../../domain/ports/hotel-booking.repository.port';
import { Injectable } from '@nestjs/common';
import { UpdateHotelBookingDto } from '../../http/dto/update-hotel-booking.dto';

@Injectable()
export class MongoHotelBookingRepository implements HotelBookingRepositoryPort {
  constructor(
    @InjectModel('HotelBooking')
    private readonly hotelBookingModel: Model<HotelBooking>,
  ) {}

  async findAll(options?: any): Promise<HotelBooking[]> {
    return this.hotelBookingModel.find(options)
      .populate('clientId')
      .populate('hotelId')
      .lean();
  }

  async findById(id: string): Promise<HotelBooking | null> {
    return this.hotelBookingModel.findOne({ _id: id }).lean();
  }

  async save(booking: HotelBooking): Promise<HotelBooking> {
    const doc = new this.hotelBookingModel(booking);
    await doc.save();
    return doc;
  }

  async update(id: string, dto: UpdateHotelBookingDto): Promise<void> {
    await this.hotelBookingModel.updateOne({ id }, dto);
  }
}
