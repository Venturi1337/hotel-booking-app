export class HotelBooking {
  constructor(
    public id: string,
    public clientId: string,
    public hotelId: string,
    public startDate: Date,
    public endDate: Date,
    public createdDate: Date
  ) {}
}