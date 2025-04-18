export class Hotel {
  constructor(
    public readonly _id: string,
    public name: string,
    public address: string,
    public createdDate: Date
  ) {}
}