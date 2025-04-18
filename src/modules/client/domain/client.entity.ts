// src/modules/client/domain/client.entity.ts
export class Client {
  constructor(
    public readonly _id: string,
    public name: string,
    public address: string,
    public phone: string,
    public createdDate?: Date
  ) {}
}
