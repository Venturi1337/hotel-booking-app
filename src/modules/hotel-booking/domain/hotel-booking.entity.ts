import { Client } from "../../client/domain/client.entity";
import { Hotel } from "../../hotel/domain/hotel.entity";

export class HotelBooking {
  constructor(
    public _id: string,
    public clientId: string,
    public hotelId: string,
    public name: string,
    public address: string,
    public createdDate: Date,
  ) {}
}
