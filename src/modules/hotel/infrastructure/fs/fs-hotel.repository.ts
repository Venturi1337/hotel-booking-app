
import { Injectable } from '@nestjs/common';
import { Hotel } from '../../domain/hotel.entity';
import { HotelRepository } from '../../domain/hotel.repository';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class FSHotelRepository implements HotelRepository {
  private basePath = path.join(process.cwd(), 'data/Hotel');

  async findAll(): Promise<Hotel[]> {
    await fs.mkdir(this.basePath, { recursive: true });
    const files = await fs.readdir(this.basePath);
    const hotels = await Promise.all(
      files.filter(f => f !== '_metadata.json').map(f =>
        fs.readFile(path.join(this.basePath, f), 'utf-8').then(JSON.parse))
    );
    return hotels;
  }

  async save(hotel: Hotel): Promise<void> {
    await fs.mkdir(this.basePath, { recursive: true });
    const filePath = path.join(this.basePath, `${hotel._id}.json`);
    await fs.writeFile(filePath, JSON.stringify(hotel, null, 2));
  }

  async findById(id: number): Promise<Hotel | null> {
    const filePath = path.join(this.basePath, `${id}.json`);
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  async update(hotel: Hotel): Promise<void> {
    const filePath = path.join(this.basePath, `${hotel._id}.json`);
    await fs.writeFile(filePath, JSON.stringify(hotel, null, 2));
  }
}
