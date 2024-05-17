// src/csv/csv.controller.ts

import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { csvService } from './csv.service';

@Controller('csv')
export class CsvController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsv(@UploadedFile() file: Express.Multer.File) {
    // Handle the uploaded CSV file (store it in memory, process it, etc.)
    console.log('CSV file uploaded:', file.originalname);
    // Convert CSV rows to JSON
    const rows = file.buffer.toString().split('\n');
    const header = rows[0].split(','); // Assuming the first row is the header
    const jsonRows = rows.slice(1).map((row) => {
      const values = row.split(',');
      const rowObject: Record<string, string> = {};
      header.forEach((colName, index) => {
        // rowObject[colName] = values[index];
        const cleanedColName = colName
          .replace(/"/g, '')
          .replace(/[^a-zA-Z0-9_]/g, ''); // Remove special characters
        if (values[index]) {
          rowObject[cleanedColName.replace(/"/g, '')] = values[index].replace(
            /"/g,
            '',
          );
        }
      });
      return rowObject;
    });
    csvService.addRows(jsonRows);
    return { message: 'CSV file uploaded successfully', haha: jsonRows };
  }
}
