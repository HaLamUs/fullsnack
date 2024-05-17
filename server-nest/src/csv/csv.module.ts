// src/csv/csv.module.ts

import { Module } from '@nestjs/common';
import { CsvController } from './csv.controller';

@Module({
  controllers: [CsvController],
})
export class CsvModule {}
