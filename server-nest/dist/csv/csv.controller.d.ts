/// <reference types="multer" />
export declare class CsvController {
    uploadCsv(file: Express.Multer.File): Promise<{
        message: string;
        haha: Record<string, string>[];
    }>;
}
