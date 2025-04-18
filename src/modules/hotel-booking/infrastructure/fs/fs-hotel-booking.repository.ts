import { HotelBookingRepositoryPort } from '../../domain/ports/hotel-booking.repository.port';
import { HotelBooking } from '../../domain/hotel-booking.entity';
import { FileStorageService } from '../../../shared/services/file-storage.service';
import { UpdateHotelBookingDto } from '../../http/dto/update-hotel-booking.dto';

export class FSHotelBookingRepository implements HotelBookingRepositoryPort {
  private readonly entity = 'HotelBooking';

  constructor(
    private readonly basePath: string,
    private readonly fsService: FileStorageService
  ) {}

  async findAll(): Promise<HotelBooking[]> {
    return this.fsService.readAll(this.basePath, this.entity);
  }

  async findById(id: string): Promise<HotelBooking | null> {
    return this.fsService.readById(this.basePath, this.entity, id);
  }

  async save(booking: HotelBooking): Promise<HotelBooking> {
    await this.fsService.ensureEntityFolder(this.basePath, this.entity);
    await this.fsService.incrementMetadata(this.basePath, this.entity);
    await this.fsService.writeEntity(this.basePath, this.entity, booking._id, booking);
    return booking;
  }

  async update(id: string, dto: UpdateHotelBookingDto): Promise<void> {
    await this.fsService.updateById(this.basePath, this.entity, id, dto);
  }
}
