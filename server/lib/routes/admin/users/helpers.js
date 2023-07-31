"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUsersHelpers = void 0;
var ObjectId = require('mongodb').ObjectId;
// Internal Dependencies
var db_1 = require("../../../db");
var AdminUsersHelpers = /** @class */ (function () {
    function AdminUsersHelpers() {
    }
    AdminUsersHelpers.findAll = function (query) { return __awaiter(void 0, void 0, void 0, function () {
        var page, limit, skips, searchValue, filter, companyId, andQuery, dateQuery, roleQuery, paginationStage, aggregatePipeline, matchStage, matchStage, searchStage, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    page = Number(query.page) || 1;
                    limit = Number(query.pageSize) || 10;
                    skips = (page - 1) * limit;
                    searchValue = query.searchValue;
                    filter = query.filter;
                    companyId = query.companyId;
                    andQuery = [];
                    if (filter === null || filter === void 0 ? void 0 : filter.date) {
                        dateQuery = {
                            createdAt: {}
                        };
                        if (filter === null || filter === void 0 ? void 0 : filter.date.from) {
                            dateQuery.createdAt['$gte'] = new Date(filter.date.from);
                        }
                        if (filter === null || filter === void 0 ? void 0 : filter.date.to) {
                            dateQuery.createdAt['$lte'] = new Date(filter.date.to);
                        }
                        andQuery.push(dateQuery);
                    }
                    if (filter === null || filter === void 0 ? void 0 : filter.role) {
                        roleQuery = {
                            roles: {
                                $eq: filter === null || filter === void 0 ? void 0 : filter.role
                            }
                        };
                        andQuery.push(roleQuery);
                    }
                    paginationStage = {
                        $facet: {
                            data: [
                                {
                                    $skip: skips,
                                },
                                {
                                    $limit: limit,
                                },
                            ],
                            count: [
                                {
                                    $count: "count",
                                },
                            ],
                        },
                    };
                    aggregatePipeline = [];
                    if (andQuery.length) {
                        matchStage = {
                            $match: {
                                $and: andQuery
                            }
                        };
                        aggregatePipeline.push(matchStage);
                    }
                    if (companyId) {
                        matchStage = {
                            $match: {
                                companyId: ObjectId(companyId),
                            }
                        };
                        aggregatePipeline.push(matchStage);
                    }
                    if (searchValue === null || searchValue === void 0 ? void 0 : searchValue.length) {
                        searchStage = { $match: { $text: { $search: searchValue } } };
                        aggregatePipeline = __spreadArray([searchStage], aggregatePipeline);
                    }
                    return [4 /*yield*/, db_1.User.aggregate(__spreadArray(__spreadArray([], aggregatePipeline), [paginationStage]))];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
            }
        });
    }); };
    AdminUsersHelpers.findOne = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db_1.User.findById(id)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    return AdminUsersHelpers;
}());
exports.AdminUsersHelpers = AdminUsersHelpers;
//# sourceMappingURL=helpers.js.map