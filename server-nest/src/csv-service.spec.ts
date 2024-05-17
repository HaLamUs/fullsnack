// src/pagination.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { PaginationController } from './pagination/pagination.controller';
import { csvService } from './csv/csv.service';

describe('PaginationController', () => {
  let controller: PaginationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaginationController],
      providers: [], // Mock or use a real instance of CsvService
    }).compile();

    controller = module.get<PaginationController>(PaginationController);
  });

  it('should return paginated content', async () => {
    const mockRows = [{ key2: 'value2' }, { key2: 'value2' }];
    csvService.addRows(mockRows);

    const page = 1;
    const limit = 10;
    const result = await controller.getAll(page, limit);

    expect(result).toEqual({
      totalItems: mockRows.length,
      currentPage: page,
      itemsPerPage: limit,
      data: mockRows.slice(0, limit),
    });
  });

  it('should return search content', async () => {
    // Mock CsvService behavior
    const mockRows = [
      { id: '1', name: 'John', email: 'john@example.com', body: 'Hello' },
      // Add more mock data as needed
    ];
    // jest.spyOn(csvService, 'getRows').mockReturnValue(mockRows);
    csvService.addRows(mockRows);

    const query = 'john'; // Example query
    const cursor = '1'; // Example cursor
    const limit = 2; // Example limit
    const result = await controller.searchContent(query, cursor, limit);

    expect(result).toEqual({
      totalItems: mockRows.length,
      data: mockRows.slice(0, limit),
      nextCursor: mockRows.length > limit ? mockRows[limit]?.id : null,
    });
  });

  // Add more test cases as needed
});
