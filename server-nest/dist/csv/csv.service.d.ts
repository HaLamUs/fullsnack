declare class CsvService {
    private jsonRows;
    addRows(rows: Record<string, string>[]): void;
    getRows(): Record<string, string>[];
}
export declare const csvService: CsvService;
export {};
