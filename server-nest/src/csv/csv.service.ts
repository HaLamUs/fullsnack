// csv.service.ts

class CsvService {
  private jsonRows: Record<string, string>[] = [];

  // Add rows to jsonRows
  addRows(rows: Record<string, string>[]): void {
    this.jsonRows = [];
    this.jsonRows.push(...rows);
  }

  // Get jsonRows
  getRows(): Record<string, string>[] {
    return this.jsonRows;
  }
}

export const csvService = new CsvService();
