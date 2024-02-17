import { Test } from '@nestjs/testing';
import { PriceController } from '../price.controller';
import { PriceService } from '../price.service';
import { mockPriceList } from '../../../common/tests/mock';

describe('PriceController', () => {
  let priceController: PriceController;
  let priceService: PriceService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PriceController],
      providers: [
        {
          provide: PriceService,
          useValue: {
            getPriceList: jest.fn().mockResolvedValue(mockPriceList),
          },
        },
      ],
    }).compile();

    priceController = moduleRef.get<PriceController>(PriceController);
    priceService = moduleRef.get<PriceService>(PriceService);
  });

  it('should be defined', () => {
    expect(priceController).toBeDefined();
    expect(priceService).toBeDefined();
  });

  it('should return a list of prices', async () => {
    const response = await priceController.getAll();
    expect(priceService.getPriceList).toHaveBeenCalled();
    expect(response).toEqual(mockPriceList);
  });
});
