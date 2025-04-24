export class ResponseHotelBookingDto {
  constructor(
    public id: string,
    public clientId: string,
    public hotelId: string,
    public name: string,
    public address: string,
    public createdDate: Date,
    public client: any,
    public hotel: any,
  ) {}
}

export class ResponseHotelBookingsArrayDto {
  constructor(public bookings: ResponseHotelBookingDto[]) {}
}

