import { Test, TestingModule } from '@nestjs/testing';
import { OpenaiService } from './openai.service';

describe('OpenaiService', () => {
  let service: OpenaiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenaiService],
    }).compile();

    service = module.get<OpenaiService>(OpenaiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a response', (done) => {
    const text = 'Test openai';
    const mockResponse = {
      data: {
        choices: [
          {
            text: 'This is a test',
          },
        ],
      },
    };

    service.createChatCompletion(text).then((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });
  });
});
