// my.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { csvService } from '../csv/csv.service';

@Controller('/csv')
export class PaginationController {
  @Get()
  async getAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    const allContent = csvService.getRows();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedContent = allContent.slice(startIndex, endIndex);

    return {
      totalItems: allContent.length,
      currentPage: page,
      itemsPerPage: limit,
      data: paginatedContent,
    };
  }

  @Get('search')
  async searchContent(
    @Query('query') query: string,
    @Query('cursor') cursor: string, // Add cursor parameter
    @Query('limit') limit: number = 10,
  ) {
    const allContent = csvService.getRows();
    const filteredResults = [];
    allContent.map((item) => {
      if (
        typeof item === 'object' &&
        'name' in item &&
        'email' in item &&
        'body' in item
      ) {
        if (
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.email.toLowerCase().includes(query.toLowerCase()) ||
          item.body.toLowerCase().includes(query.toLowerCase())
        ) {
          filteredResults.push(item);
        }
      }
    });

    // Find the index of the cursor (if provided)
    const cursorIndex = cursor
      ? filteredResults.findIndex((content) => content.id === cursor)
      : 0;

    // Get the next 'limit' items after the cursor
    const paginatedResults = filteredResults.slice(
      cursorIndex,
      cursorIndex + limit,
    );

    return {
      totalItems: filteredResults.length,
      data: paginatedResults,
      nextCursor:
        paginatedResults.length < limit
          ? null
          : filteredResults[cursorIndex + limit]?.id,
    };
  }
}
