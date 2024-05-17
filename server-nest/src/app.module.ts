import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CsvModule } from './csv/csv.module';
import { PaginationModule } from './pagination/pagination.module';

@Module({
  imports: [CsvModule, PaginationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
