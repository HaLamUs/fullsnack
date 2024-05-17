"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const csv_service_1 = require("./csv.service");
let CsvController = class CsvController {
    async uploadCsv(file) {
        console.log('CSV file uploaded:', file.originalname);
        const rows = file.buffer.toString().split('\n');
        const header = rows[0].split(',');
        const jsonRows = rows.slice(1).map((row) => {
            const values = row.split(',');
            const rowObject = {};
            header.forEach((colName, index) => {
                const cleanedColName = colName
                    .replace(/"/g, '')
                    .replace(/[^a-zA-Z0-9_]/g, '');
                if (values[index]) {
                    rowObject[cleanedColName.replace(/"/g, '')] = values[index].replace(/"/g, '');
                }
            });
            return rowObject;
        });
        csv_service_1.csvService.addRows(jsonRows);
        return { message: 'CSV file uploaded successfully', haha: jsonRows };
    }
};
exports.CsvController = CsvController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CsvController.prototype, "uploadCsv", null);
exports.CsvController = CsvController = __decorate([
    (0, common_1.Controller)('csv')
], CsvController);
//# sourceMappingURL=csv.controller.js.map