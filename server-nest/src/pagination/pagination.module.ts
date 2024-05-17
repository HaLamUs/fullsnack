// src/csv/csv.module.ts

import { Module } from '@nestjs/common';
import { PaginationController } from './pagination.controller';

@Module({
  controllers: [PaginationController],
})
export class PaginationModule {}
