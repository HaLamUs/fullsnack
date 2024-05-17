export declare class PaginationController {
    getAll(page?: number, limit?: number): Promise<{
        totalItems: number;
        currentPage: number;
        itemsPerPage: number;
        data: Record<string, string>[];
    }>;
    searchContent(query: string, cursor: string, limit?: number): Promise<{
        totalItems: number;
        data: any[];
        nextCursor: any;
    }>;
}
