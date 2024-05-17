"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvService = void 0;
class CsvService {
    constructor() {
        this.jsonRows = [];
    }
    addRows(rows) {
        this.jsonRows = [];
        this.jsonRows.push(...rows);
    }
    getRows() {
        return this.jsonRows;
    }
}
exports.csvService = new CsvService();
//# sourceMappingURL=csv.service.js.map