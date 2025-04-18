import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { GetOneHotelUseCase } from '../../../hotel/application/get-one-hotel.usecase';
import { GlobalApiResponse } from '../../../shared/http/response/api.response';
import { GetOneClientUseCase } from '../../../client/application/use-cases/get-one-client.use-case';

@Injectable()
export class ValidateClientHotelMiddleware implements NestMiddleware {
  constructor(
    private readonly getOneHotelUseCase: GetOneHotelUseCase,
    private readonly getOneClientUseCase: GetOneClientUseCase,
  ) {}

  async use(req: any, res: any, next: () => void) {
    const { clientId, hotelId } = req.body;

    const clientResponse = await this.getOneClientUseCase.execute(clientId);
    if (!clientResponse.data) {
      return res.status(400).json(GlobalApiResponse.error({
        message: clientResponse.error?.message || 'Client not found',
        statusCode: 400
      }));
    }

    const hotelResponse = await this.getOneHotelUseCase.execute(hotelId);
    if (!hotelResponse.data) {
      return res.status(400).json(GlobalApiResponse.error({
        message: hotelResponse.error?.message || 'Hotel not found',
        statusCode: 400
      }));
    }

    next();
  }
}