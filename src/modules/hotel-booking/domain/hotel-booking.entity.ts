// src/modules/hotel-booking/domain/hotel-booking.entity.ts
export class HotelBooking {
  constructor(
    public readonly _id: number,
    public name: string,
    public address: string,
    public createdDate: Date,
    public hotelId: number,
    public clientId: number
  ) {}
}