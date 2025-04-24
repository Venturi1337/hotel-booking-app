import { Hotel } from '../../domain/hotel.entity';
import { HotelRepositoryPort } from '../../domain/ports/hotel.repository.port';
import { FileStorageService } from '../../../shared/services/file-storage.service';

export class FSHotelRepository implements HotelRepositoryPort {
  private readonly entity = 'Hotel';

  constructor(
    private readonly basePath: string,
    private readonly fsService: FileStorageService
  ) {}

  async findAll(): Promise<Hotel[]> {
    return this.fsService.readAll(this.basePath, this.entity);
  }

  async findById(id: string): Promise<Hotel | null> {
    return this.fsService.readById(this.basePath, this.entity, id);
  }

  async save(hotel: Hotel): Promise<Hotel> {
    await this.fsService.ensureEntityFolder(this.basePath, this.entity);
    await this.fsService.incrementMetadata(this.basePath, this.entity);
    await this.fsService.writeEntity(this.basePath, this.entity, hotel._id, hotel);
    return hotel;
  }

  async update(id: string, hotel: Hotel): Promise<void> {
    const existingHotel = await this.findById(id);
    if (!existingHotel) {
      throw new Error(`Hotel with id ${id} not found`);
    }

    // Merge existing hotel data with new data
    const updatedHotel = { ...existingHotel, ...hotel };

    await this.fsService.updateById(this.basePath, this.entity, id, updatedHotel);
  }
}
