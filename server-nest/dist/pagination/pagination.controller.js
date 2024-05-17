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
exports.PaginationController = void 0;
const common_1 = require("@nestjs/common");
const csv_service_1 = require("../csv/csv.service");
let PaginationController = class PaginationController {
    async getAll(page = 1, limit = 10) {
        const allContent = csv_service_1.csvService.getRows();
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedContent = allContent.slice(startIndex, endIndex);
        return {
            totalItems: allContent.length,
            currentPage: page,
            itemsPerPage: limit,
            data: paginatedContent,
        };
    }
    async searchContent(query, cursor, limit = 10) {
        const allContent = csv_service_1.csvService.getRows();
        const filteredResults = [];
        allContent.map((item) => {
            if (typeof item === 'object' &&
                'name' in item &&
                'email' in item &&
                'body' in item) {
                if (item.name.toLowerCase().includes(query.toLowerCase()) ||
                    item.email.toLowerCase().includes(query.toLowerCase()) ||
                    item.body.toLowerCase().includes(query.toLowerCase())) {
                    filteredResults.push(item);
                }
            }
        });
        const cursorIndex = cursor
            ? filteredResults.findIndex((content) => content.id === cursor)
            : 0;
        const paginatedResults = filteredResults.slice(cursorIndex, cursorIndex + limit);
        return {
            totalItems: filteredResults.length,
            data: paginatedResults,
            nextCursor: paginatedResults.length < limit
                ? null
                : filteredResults[cursorIndex + limit]?.id,
        };
    }
};
exports.PaginationController = PaginationController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PaginationController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('query')),
    __param(1, (0, common_1.Query)('cursor')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], PaginationController.prototype, "searchContent", null);
exports.PaginationController = PaginationController = __decorate([
    (0, common_1.Controller)('/csv')
], PaginationController);
//# sourceMappingURL=pagination.controller.js.map