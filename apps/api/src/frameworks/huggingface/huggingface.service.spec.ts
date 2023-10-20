import { Test, TestingModule } from '@nestjs/testing';
import { HuggingFaceService } from './huggingface.service';

describe('HuggingFaceService', () => {
  let service: HuggingFaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HuggingFaceService],
    }).compile();

    service = module.get<HuggingFaceService>(HuggingFaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a response', (done) => {
    const text = 'Test hugging face';
    const mockResponse = {
      label: 'POSITIVE',
      score: 0.9998762602806091,
    };

    jest
      .spyOn(service, 'getClassification')
      .mockImplementation(async () => mockResponse);

    service.getClassification(text).then((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });
  });
});
